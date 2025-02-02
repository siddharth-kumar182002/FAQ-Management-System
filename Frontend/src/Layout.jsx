import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/Admin" style={styles.navLink}>Admin</Link>
          </li>
        </ul>
        <h1 style={styles.title}>FAQ Management</h1>
      </nav>

      <Outlet />
    </>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '16px',
    fontWeight: '500',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};

export default Layout;