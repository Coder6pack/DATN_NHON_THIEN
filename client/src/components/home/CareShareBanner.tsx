import Link from 'next/link';

const CareShareBanner = () => (
  <Link href="/care-share" className="block w-full px-8 mb-12">
    <div className=" rounded-3xl overflow-hidden relative cursor-pointer transition-shadow hover:shadow-2xl">
      <img
        src="/images/mceclip33.png"
        alt="Care & Share Banner"
        className="w-full h-full object-cover object-left min-h-[430px]"
      />
    </div>
  </Link>
);

export default CareShareBanner; 