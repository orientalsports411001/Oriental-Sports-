export default function NotAuthorizedPage() {
  return (
    <div style={{ maxWidth: 480, margin: '80px auto', textAlign: 'center' }}>
      <h1>Not authorized</h1>
      <p>
        Your account is signed in but does not have admin access. Ask an
        existing admin to promote your profile (see docs/ADMIN_SETUP.md).
      </p>
      <p>
        <a href="/login">Back to login</a>
      </p>
    </div>
  );
}
