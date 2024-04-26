// src/components/About/Timeline.js


const TimelineData = [
  {
    year: "2025",
    title: "M. Sc. Artificial Intelligence (2023-25)",
    description: "Graduating next spring with a masters degree in AI from JKU Linz",
  },
  {
    year: "2023",
    title: "Freelance IT Consultant (2023-now)",
    description: "Helping businesses automate various processes using AI",
  },
  {
    year: "2022",
    title: "Research Scientist, JGU Institute of Computer Science (2022-23)",
    description: "Investigated the learnability of dynamic systems with various machine learning models.",
  },
  {
    year: "2022",
    title: "B. Sc. Computer Science (2019-22)",
    description: "Graduated from JGU Mainz with a bachelors in CS",
  },
  {
    year: "2020",
    title: "Research Assistant, Helmholtz Institute (2020-21)",
    description: "CASPER - Automated the hyperpolarization process of xenon gas.",
  },
  // Add more events as needed
];

const Timeline = () => {
  return (
    <section className="w-full px-5 py-10 sm:px-12 sm:py-16 bg-gray-100 dark:bg-gray-800  sm:text-center lg:text-left border-b-2 border-solid border-dark dark:border-light">
      <h2 className="font-semibold text-lg sm:text-3xl md:text-4xl text-accent dark:text-accentDark font-bold text-accent dark:text-accentDark mb-20 text-center">What I've been up to</h2>
      <div className="relative md:before:absolute md:before:w-0.5 md:before:bg-dark dark:md:before:bg-light md:before:h-full md:before:left-1/3 md:before:transform md:before:translate-x-[-50%] md:before:z-0">
        {TimelineData.map((event, index) => (
          <div key={index} className={`flex flex-col items-center mb-10 md:flex-row md:flex-row-reverse`}>
            <span className="z-10 font-semibold inline-block capitalize text-base xs:text-lg sm:text-xl md:text-2xl py-2 xs:py-3 sm:py-4 lg:py-5 px-4 xs:px-6 sm:px-8 lg:px-12 border-2 border-solid border-dark dark:border-light rounded mr-3 mb-3 xs:mr-4 xs:mb-4 md:mr-6 md:mb-6 hover:scale-105 transition-all ease duration-200 cursor-pointer dark:font-normal text-dark dark:text-light md:absolute md:left-1/3 md:transform md:translate-x-[-120%] ">
              {event.year}
            </span>
            <div className="w-full md:w-7/12 lg:w-8/12 px-4 md:px-6 lg:px-8">
              <h3 className="text-xl font-bold text-accent dark:text-accentDark">{event.title}</h3>
              <p className="text-base text-dark dark:text-light mt-2">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <a href="{pdfUrl}" download="Full_CV.pdf" className="flex items-center font-semibold inline-block capitalize text-base xs:text-lg sm:text-xl md:text-2xl py-2 xs:py-3 sm:py-4 lg:py-5 px-4 xs:px-6 sm:px-8 lg:px-12 border-2 rounded hover:scale-105 transition-all ease duration-200 cursor-pointer border-accent dark:border-accentDark text-accent dark:text-accentDark">
          Read my full CV
        </a>
      </div>
    </section>
  );
};

export default Timeline;
