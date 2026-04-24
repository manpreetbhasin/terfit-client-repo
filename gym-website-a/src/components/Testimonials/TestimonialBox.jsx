import Quotes from "../../images/testimonials/quotes.png";
import BoxShape from "../../images/testimonials/testimonial-shape.svg";

function TestimonialBox({ text, name, job }) {
  return (
    <div className="absolute flex flex-col bg-black  top-0 right-0 w-[60%] md1000:w-full h-full py-[47px] px-[50px] min540:py-[24px] min540:px-[30px] min540:h-[400px] min375:h-[500px]">
      <img alt="quote_img" src={Quotes} className="w-[60px]" />
      <p className=" text-[16px] italic text-[#dedede] my-6 z-10">{text}</p>
      <h3 className="text-white text-[21px] mb-1 font-bold">{name}</h3>
      <p className="text-[14px] font-medium text-[#dedede]">{job}</p>
      <img
        alt="box_img"
        src={BoxShape}
        className="w-[175px] absolute bottom-0 right-[135px] invert opacity-40"
      />
    </div>
  );
}

export default TestimonialBox;
