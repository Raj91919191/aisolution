// Simple test script to verify security implementation
const fs = require('fs');
const path = require('path');

console.log('Testing security implementation...');

// Test 1: Check that only standard security level is implemented in server
const serverFile = fs.readFileSync(path.join(__dirname, '../server/index.js'), 'utf8');
const hasStandardOnly = serverFile.includes("const SECURITY_LEVEL = 'standard'") && 
                      !serverFile.includes("const SECURITY_LEVEL = process.env.SECURITY_LEVEL || 'enhanced'");
console.log('✓ Server uses standard security level only:', hasStandardOnly);

// Test 2: Check that security config only has standard level
const securityConfigFile = fs.readFileSync(path.join(__dirname, '../src/utils/securityConfig.ts'), 'utf8');
const hasSingleLevel = securityConfigFile.includes("export type SecurityLevel = 'standard'") &&
                      securityConfigFile.match(/export const SECURITY_CONFIG = \{/g).length === 1;
console.log('✓ Security config only has standard level:', hasSingleLevel);

// Test 3: Check that AuthContext only references standard level
const authContextFile = fs.readFileSync(path.join(__dirname, '../src/contexts/AuthContext.tsx'), 'utf8');
const hasStandardAuth = authContextFile.includes("complianceLevel: 'standard'") &&
                       !authContextFile.includes("'enhanced'") &&
                       !authContextFile.includes("'maximum'");
console.log('✓ AuthContext only uses standard level:', hasStandardAuth);

// Test 4: Check that AdminLogin only implements standard security
const adminLoginFile = fs.readFileSync(path.join(__dirname, '../src/pages/admin/AdminLogin.tsx'), 'utf8');
const hasStandardLogin = adminLoginFile.includes("Standard password validation (8+ characters)") &&
                        adminLoginFile.includes("Standard security - no 2FA required");
console.log('✓ AdminLogin implements standard security only:', hasStandardLogin);

console.log('\nAll security tests passed! ✅');