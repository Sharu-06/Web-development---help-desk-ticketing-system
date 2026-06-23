import React from 'react';

export default function Footer() {
  return (
    <footer className="footer text-center py-3">
      <div>HelpDesk • Demo UI • Built by Sharu</div>
      <div className="text-muted">© {new Date().getFullYear()}</div>
    </footer>
  );
}
