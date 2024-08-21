import PropTypes from "prop-types";

const FrameComponent = ({ className = "" }) => {
  return (
    <section
      className={`w-[68.563rem] flex flex-row items-start justify-center py-[0rem] px-[1.25rem] box-border max-w-full text-center text-[4.319rem] text-darkslategray-100 font-gochi-hand ${className}`}
    >
      <div className="w-[41.688rem] rounded-3xl bg-white border-darkslategray-200 border-[7px] border-solid box-border flex flex-row items-start justify-start py-[1.75rem] pl-[6.062rem] pr-[5.625rem] gap-[2.437rem] max-w-full z-[1] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border mq750:flex-wrap mq750:gap-[1.188rem] mq750:pl-[3rem] mq750:pr-[2.813rem] mq750:box-border">
        <div className="h-[10rem] w-[41.688rem] relative rounded-3xl bg-white border-darkslategray-200 border-[7px] border-solid box-border hidden max-w-full" />
        <img
          className="h-[5.5rem] w-[5.5rem] relative object-cover z-[2]"
          loading="lazy"
          alt=""
          src="/ton@2x.png"
        />
        <div className="w-[21.188rem] flex flex-col items-start justify-start pt-[1.687rem] px-[0rem] pb-[0rem] box-border max-w-full">
          <div className="self-stretch h-[2.063rem] relative inline-block z-[1] mq450:text-[2.563rem] mq1000:text-[3.438rem]">
            Ton Connect
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;