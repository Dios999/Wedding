# Wedding RSVP Site

This project now includes a small Node server to collect RSVP submissions and display them on a private admin page.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. The admin page is protected by the password `dios999`.
3. Start the server:
   ```bash
   npm start
   ```
4. Visit `http://localhost:3000/rsvp.html` to submit RSVPs.
5. Visit `http://localhost:3000/admin.html` and enter the password to view submissions.

RSVPs are stored in `rsvps.json` on the server.
