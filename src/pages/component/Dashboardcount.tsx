const Dashboardcount = (props) => {
  return (
    <div className="h-44  shadow-lg p-5 text-center flex flex-col space-y-5 bg-white rounded-md">
      <h1 className="text-2xl font-bold text-center">{props.title}</h1>
      <span className="text-6xl font-semibold">{props.count}</span>
    </div>
  );
};

export default Dashboardcount;
