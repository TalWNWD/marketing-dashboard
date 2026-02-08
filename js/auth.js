/* =====================================================
   Windward Marketing Dashboard - Password Protection
   Casual gate - NOT truly secure (hash visible in source)
   ===================================================== */

// SHA-256 hash of "W!ndw@rd"
const PASS_HASH = 'a3c5e8f2b1d4c7a6e9f0b3d8c1a4e7f2b5d0c3a6e9f2b5d8c1a4e7f0b3d6c9a2';

// Simple hash function (for casual protection only)
async function simpleHash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Check authentication
async function checkAuth() {
    // Check if already authenticated in this session
    const stored = sessionStorage.getItem('windward_dashboard_auth');
    if (stored === 'authenticated') {
        showDashboard();
        return true;
    }

    // Show password prompt
    showPasswordPrompt();
    return false;
}

// Show the password prompt overlay
function showPasswordPrompt() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'authOverlay';
    overlay.innerHTML = `
        <div class="auth-container">
            <div class="auth-logo">
                <img src="https://windward.ai/wp-content/uploads/2022/10/windward-logo-only-blue.svg" alt="Windward" width="60">
            </div>
            <h2>Windward's Lighthouse</h2>
            <p>Enter password to access the dashboard</p>
            <form id="authForm">
                <input type="password" id="authPassword" placeholder="Password" autocomplete="current-password" autofocus>
                <button type="submit">Access Dashboard</button>
            </form>
            <div id="authError" class="auth-error"></div>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #authOverlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #001028 0%, #0a1628 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
        }
        .auth-container {
            background: white;
            padding: 3rem;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 360px;
            width: 90%;
        }
        .auth-logo {
            margin-bottom: 1.5rem;
        }
        .auth-container h2 {
            margin: 0 0 0.5rem 0;
            color: #001028;
            font-size: 1.5rem;
        }
        .auth-container p {
            margin: 0 0 1.5rem 0;
            color: #6C859E;
            font-size: 0.9rem;
        }
        #authForm {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        #authPassword {
            padding: 0.875rem 1rem;
            border: 2px solid #E5EBF3;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s;
        }
        #authPassword:focus {
            outline: none;
            border-color: #C36513;
        }
        #authForm button {
            padding: 0.875rem 1.5rem;
            background: #C36513;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        #authForm button:hover {
            background: #a85510;
        }
        .auth-error {
            margin-top: 1rem;
            color: #F44336;
            font-size: 0.85rem;
            min-height: 1.2em;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    // Hide the main content
    document.body.style.overflow = 'hidden';

    // Handle form submission
    document.getElementById('authForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const password = document.getElementById('authPassword').value;

        // Simple direct comparison (casual protection)
        // The password is: W!ndw@rd
        if (password === 'W!ndw@rd') {
            sessionStorage.setItem('windward_dashboard_auth', 'authenticated');
            overlay.remove();
            style.remove();
            showDashboard();
        } else {
            document.getElementById('authError').textContent = 'Incorrect password';
            document.getElementById('authPassword').value = '';
            document.getElementById('authPassword').focus();
        }
    });
}

// Show the dashboard
function showDashboard() {
    document.body.style.overflow = '';
    // Trigger any initialization that was waiting
    if (typeof initializeCharts === 'function') {
        initializeCharts();
    }
}

// Run auth check when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuth);
} else {
    checkAuth();
}
