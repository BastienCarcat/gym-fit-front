export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          The all in ONE <br /> fitness API
        </h2>
        <p className="pt-8 text-xl text-gray-900 sm:text-2xl">
          Access to over 500+ gym exercises with complete informations and many
          fitness calculators like TDEE, BMR, BMI or IBW
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
              href="#"
            >
              See documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
