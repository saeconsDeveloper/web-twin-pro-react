import Head from "../../Components/Head";
import styleDashboard from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <>
      <Head title="Dashboard" />
      <h1 className={`${styleDashboard.welcome} w-[80rem] text-center`}>
        Welcome to Web-Twin Pro CMS
      </h1>
    </>
  );
};

export default Dashboard;
