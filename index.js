const express = require('express');
const cors = require('cors');
const compression = require('compression');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Security configuration - Standard Security Level only
const SECURITY_LEVEL = 'standard'; // hidden from users

const SECURITY_CONFIG = {
  standard: {
    rateLimit: 100,
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    sslTlsVersion: 'TLS 1.2+'
  }
};

const currentSecurityConfig = SECURITY_CONFIG[SECURITY_LEVEL];

dotenv.config();

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit for testing - limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
// app.use(limiter); // Commented out rate limiting for testing
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' })); // Increase payload limit

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_change_me';

// Admin users
const users = [
  {
    id: '1',
    email: 'admin@aisolutions.com',
    password: 'Admin@2024!',
    name: 'System Administrator',
    role: 'admin'
  },
  {
    id: '2',
    email: 'moderator@aisolutions.com',
    password: 'Mod@2024!',
    name: 'Content Moderator',
    role: 'moderator'
  }
];

const dataDir = path.join(__dirname, 'data');
const distDir = path.join(__dirname, '..', 'dist');
const files = {
  events: path.join(dataDir, 'events.json'),
  gallery: path.join(dataDir, 'gallery.json'),
  services: path.join(dataDir, 'services.json'),
  contacts: path.join(dataDir, 'contacts.json'),
  portfolio: path.join(dataDir, 'portfolio.json'),
  blogs: path.join(dataDir, 'blogs.json'),
};

// Cache for data files to reduce disk I/O
const dataCache = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function readJson(filePath) {
  const now = Date.now();
  
  // Check if we have a valid cache entry
  if (dataCache[filePath] && (now - dataCache[filePath].timestamp) < CACHE_DURATION) {
    return dataCache[filePath].data;
  }
  
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, 'utf8');
    if (!raw) return [];
    const data = JSON.parse(raw);
    
    // Update cache
    dataCache[filePath] = {
      data: data,
      timestamp: now
    };
    
    return data;
  } catch (e) {
    console.error('Failed reading', filePath, e);
    return [];
  }
}

// Security audit log
const securityAuditLog = [];

// Log security actions
function logSecurityAction(action, details, success = true) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    ipAddress: '127.0.0.1', // In real implementation, get actual IP
    userAgent: 'Node.js Server', // In real implementation, get actual user agent
    success,
    details
  };
  
  securityAuditLog.push(logEntry);
  
  // Keep only last 1000 entries
  if (securityAuditLog.length > 1000) {
    securityAuditLog.shift();
  }
  
  console.log(`[SECURITY AUDIT] ${JSON.stringify(logEntry)}`);
}

function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Failed writing', filePath, e);
    return false;
  }
}

function generateToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
}

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.get('/api/health', (_, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  
  // Log authentication attempt
  logSecurityAction('authentication_attempt', `Login attempt for ${email}`, false);
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    logSecurityAction('authentication_failed', `Failed login for ${email}`, false);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  logSecurityAction('authentication_success', `Successful login for ${email}`, true);
  const token = generateToken(user);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

app.get('/api/events', (_, res) => res.json(readJson(files.events)));
app.get('/api/gallery', (_, res) => res.json(readJson(files.gallery)));
app.get('/api/services', (_, res) => res.json(readJson(files.services)));
app.get('/api/portfolio', (_, res) => res.json(readJson(files.portfolio)));
app.get('/api/blogs', (_, res) => res.json(readJson(files.blogs)));
app.get('/api/contacts', auth, (req, res) => {
  try {
    const contacts = readJson(files.contacts);
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// Create endpoints
app.post('/api/contacts', (req, res) => {
  try {
    const contacts = readJson(files.contacts);
    const item = { id: String(Date.now()), ...req.body, createdAt: new Date().toISOString() };
    contacts.push(item);
    writeJson(files.contacts, contacts);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Failed to create contact' });
  }
});

// Update contact status endpoint
app.patch('/api/contacts/:id/status', auth, (req, res) => {
  try {
    const contacts = readJson(files.contacts);
    const { id } = req.params;
    const { status } = req.body;
    
    const contactIndex = contacts.findIndex(contact => contact.id === id);
    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    contacts[contactIndex] = { ...contacts[contactIndex], status };
    writeJson(files.contacts, contacts);
    res.json(contacts[contactIndex]);
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ message: 'Failed to update contact status' });
  }
});

// Update contact notes endpoint
app.patch('/api/contacts/:id/notes', auth, (req, res) => {
  try {
    const contacts = readJson(files.contacts);
    const { id } = req.params;
    const { adminNotes } = req.body;
    
    const contactIndex = contacts.findIndex(contact => contact.id === id);
    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    contacts[contactIndex] = { ...contacts[contactIndex], adminNotes };
    writeJson(files.contacts, contacts);
    res.json(contacts[contactIndex]);
  } catch (error) {
    console.error('Error updating contact notes:', error);
    res.status(500).json({ message: 'Failed to update contact notes' });
  }
});

// Delete contact endpoint
app.delete('/api/contacts/:id', auth, (req, res) => {
  try {
    const contacts = readJson(files.contacts);
    const { id } = req.params;
    
    const contactIndex = contacts.findIndex(contact => contact.id === id);
    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    const deletedContact = contacts.splice(contactIndex, 1)[0];
    writeJson(files.contacts, contacts);
    res.json(deletedContact);
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
});

app.post('/api/events', auth, (req, res) => {
  try {
    const list = readJson(files.events);
    const item = { id: String(Date.now()), ...req.body };
    list.push(item);
    writeJson(files.events, list);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

app.post('/api/services', auth, (req, res) => {
  try {
    const list = readJson(files.services);
    const item = { id: String(Date.now()), ...req.body };
    list.push(item);
    writeJson(files.services, list);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Failed to create service' });
  }
});

app.post('/api/gallery', auth, (req, res) => {
  try {
    const list = readJson(files.gallery);
    const item = { id: String(Date.now()), ...req.body };
    list.push(item);
    writeJson(files.gallery, list);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ message: 'Failed to create gallery item' });
  }
});

app.post('/api/portfolio', auth, (req, res) => {
  try {
    const list = readJson(files.portfolio);
    const item = { id: String(Date.now()), ...req.body };
    list.push(item);
    writeJson(files.portfolio, list);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    res.status(500).json({ message: 'Failed to create portfolio item' });
  }
});

app.post('/api/blogs', auth, (req, res) => {
  try {
    const list = readJson(files.blogs);
    const item = { id: String(Date.now()), ...req.body };
    list.push(item);
    writeJson(files.blogs, list);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Failed to create blog' });
  }
});

// Serve built frontend with caching headers if available
try {
  if (fs.existsSync(distDir)) {
    // Serve static files with aggressive caching
    app.use(express.static(distDir, {
      maxAge: '1d', // Cache for 1 day
      etag: true,
      lastModified: true
    }));
    
    app.get(/^(?!\/api).*/, (_, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }
} catch {}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  console.log(`Server startup time: ${process.uptime()} seconds`);
});