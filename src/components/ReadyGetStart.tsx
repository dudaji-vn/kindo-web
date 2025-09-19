import Image from 'next/image';

export default function ReadyGetStartSection() {
  return (
    <>
      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-[#FFF8F1] to-[#FEEEDA] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
            Ready to get start?
          </h2>
          <p className="mb-8 text-xl text-orange-100">Download App Now</p>

          {/* Download buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-gray-900 shadow-lg transition-colors hover:bg-gray-100"
            >
              <Image
                src="/next.svg"
                alt="App Store"
                width={24}
                height={24}
                className="mr-3"
              />
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-gray-900 shadow-lg transition-colors hover:bg-gray-100"
            >
              <Image
                src="/next.svg"
                alt="Google Play"
                width={24}
                height={24}
                className="mr-3"
              />
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Company Info */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-center">
                <span className="text-lg font-semibold text-orange-500">
                  About us
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                DUDAJI VIETNAM 🇻🇳
              </h3>
              <p className="mx-auto max-w-3xl leading-relaxed text-gray-600">
                Dudaji supports you to quickly build a deep learning
                ultra-service of AI and easily place.
              </p>
              <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-gray-600">
                To put machine learning and deep learning techniques into
                practice, you can not only design algorithms, but also there is
                a great need for infrastructure knowledge, such as data
                preprocessing, building a distributed development environment,
                resource management, and process management based on the
                experience of conducting various AI projects, Dudaji accelerates
                the implementation of AI as a service quickly.
              </p>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500">
                Dudaji, Inc © All Rights Reserved.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                <a
                  href="mailto:contact@dudaji.vn"
                  className="transition-colors hover:text-orange-500"
                >
                  contact@dudaji.vn
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
