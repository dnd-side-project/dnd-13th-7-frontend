export default function Footer() {
  return (
    <div className="w-full text-grey-color-5 border-t border-light-color-4">
      <footer className="mx-auto max-w-screen-xl px-4 py-16">
        {/* Top brand + desc + email */}
        <div className="flex flex-col gap-6">
          <div className="w-[144px] h-10 bg-[#FF9AD6]" aria-label="logo" />
          <p className=" text-sm">IT 직군을 위한 실전 성장 플랫폼, 모여잇</p>
          <a
            href="mailto:ahdudlt@gmail.com"
            className=" text-sm hover:text-white"
          >
            AHDUDLT@GMAIL.COM
          </a>
        </div>

        {/* Divider */}
        <hr className="my-12 border-gray-700" />

        {/* Bottom copyright + social */}
        <div className="flex items-center justify-between text-xs ">
          <p>© {new Date().getFullYear()} MOYEOIT</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="instagram"
            className="inline-flex items-center justify-center w-6 h-6 rounded border border-gray-700 hover:border-gray-500"
          >
            <span>📷</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
