import { motion } from "framer-motion";
import Picture from "../../components/common/Picture";

export default function MarketplaceFeaturedNftCard({ nftCardItem, extraClasses }) {
    const { nftImg, ownerImg, title, stockCount, price, motionDelay } = nftCardItem || {};
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 1, delay: motionDelay }}
            className={`space-y-8 ${extraClasses}`}>
            <div className="h-[424px]">
                <Picture
                    src={nftImg}
                    alt="nft picture"
                    extraClasses="rounded-3xl cursor-pointer"
                />
            </div>

            <div className="flex flex-row items-center justify-between gap-4 max-[355px]:flex-col max-[355px]:justify-center">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <Picture
                            src={ownerImg}
                            alt="nft owner"
                            extraClasses=""
                        />
                    </div>

                    <div className="space-y-1">
                        <p className="text-600 text-neutral-900 font-bold leading-tight cursor-pointer">{title}</p>
                        <p>{stockCount} in the stock</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-300 font-medium leading-tight max-[355px]:text-center">Highest Bid</p>

                    <div className="flex items-center justify-between gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="22" viewBox="0 0 13 22" fill="none">
                            <g clipPath="url(#clip0_0_213)">
                                <path d="M12.671 11.4564L6.50004 15.3231L0.325043 11.4564L6.50004 0.589722L12.671 11.4564ZM6.50004 16.5647L0.325043 12.6981L6.50004 21.9231L12.675 12.6981L6.50004 16.5647Z" fill="#3A3A3A" />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_213">
                                    <rect width="13" height="21.3333" fill="white" transform="translate(0 0.589722)" />
                                </clipPath>
                            </defs>
                        </svg>
                        <p className="text-500 font-bold leading-tight">{price} ETH</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
