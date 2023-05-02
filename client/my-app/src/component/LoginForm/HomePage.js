import {Link} from "react-router-dom"

const HomePage = () => {
  return (
    <>
     
      <div
        id="form"
        className="card text-center  mb-3 reg-form"
        style={{width: "18rem", margin:"5% 0 0 35%"}}
      >
        <div className="card-body" style={{padding:"20%" , backgroundColor:"#f3e8ff"}}>
          <h5 className="card-title">Welcome</h5>
          <p className="card-text">Welcome to the home page of this website.</p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};


export default HomePage;