import Link from "next/link";

export default function NotFound() {
  return (
    <main className="my-16 w-full dark:bg-dark flex justify-center font-mr">
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        {/* Container to hold tiled videos */}
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 12 }).map((_, idx) => (
            <>
              <video
                key={`normal-${idx}`}
                src="/somanyvictors.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover dark:hidden" // Visible only in light mode
              >
                Your browser does not support the video tag.
              </video>
              <video
                key={`inverted-${idx}`}
                src="/somanyvictorsinverted.mp4"
                autoPlay
                loop
                muted
                className="hidden w-full h-full object-cover dark:block" // Visible only in dark mode
              >
                Your browser does not support the video tag.
              </video>
            </>
          ))}
        </div>

        {/* Text and Link Elements */}
        <div className="z-10 p-8 mt-16">
          <h1 className={`inline-block text-dark dark:text-light
            text-6xl font-bold w-full capitalize xl:text-8xl text-center`}>404</h1>
          <h2 className={`inline-block text-dark dark:text-light
            text-5xl font-bold w-full capitalize xl:text-6xl text-center mt-4 tracking-wide leading-snug`}>Page Not Found!</h2>
          <h4 className={`inline-block text-dark dark:text-light
            text-2xl font-bold w-full capitalize xl:text-6xl text-center mt-4 tracking-wide leading-snug`}>(leave before it's too late)</h4>
        </div>
      </div>
    </main>
  );
}
