export default function Loader() {
  //My Loader Component, that is used in all that component where data is fetching or data is taken from redux store
  return (
    <section className="w-full h-[90vh] flex justify-center items-center">
      <div
        className="loader"
        style={{ width: "100px", height: "100px", borderWidth: "7.5px" }}
      ></div>
    </section>
  );
}
