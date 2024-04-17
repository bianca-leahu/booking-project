const AppLayout = ({ children }) => (
  <>
  {/* Here we would have the navbar that will be present in all the pages */}
    <div className="app-header">
      {/* <p>Booking App</p> */}
    </div>
    <div className="app-content">{children}</div>
  </>
);

export default AppLayout;
