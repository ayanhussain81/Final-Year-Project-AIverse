import { motion } from "framer-motion";
import Picture from "../../components/common/Picture";
import OutlinedButton from "../../components/common/buttons/OutlinedButton";

export default function MarketplaceOtherNftCard({ nftCardItem, extraClasses }) {
    const { nftImg, ownerImg, title, stockCount, price, motionDelay } = nftCardItem || {};

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 1, delay: motionDelay }}
            className={`grid grid-flow-row mobile-md:max-[434px]:grid-flow-col min-[801px]:grid-flow-col min-[1325px]:justify-start items-center gap-5 ${extraClasses}`}>
            <div className="h-[147px]">
                <Picture
                    src={nftImg}
                    alt="nft picture"
                    extraClasses="rounded-3xl cursor-pointer"
                />
            </div>

            <div className="flex | flex-col min-[700px]:max-[800px]:flex-row | items-start max-mobile-md:items-center min-[435px]:max-[800px]:items-center | min-[700px]:max-[800px]:justify-between | gap-4">
                <div>
                    <p className="mb-2 text-600 text-neutral-900 font-bold leading-tight max-[355px]:text-center cursor-pointer">{title}</p>

                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <Picture
                                src={ownerImg}
                                alt="nft owner"
                                extraClasses="max-h-[34px] aspect-square"
                            />
                        </div>

                        <div className="flex items-center justify-between gap-1 p-2 border border-solid border-accent-400 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                <g clipPath="url(#clip0_0_252)">
                                    <path d="M8.31533 7.13126L4.26566 9.66876L0.213318 7.13126L4.26566 0L8.31533 7.13126ZM4.26566 10.4836L0.213318 7.9461L4.26566 14L8.318 7.9461L4.26566 10.4836Z" fill="#00AC4F" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_252">
                                        <rect width="8.53125" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className="text-300 text-accent-400 font-bold leading-tight">{price} ETH</p>
                        </div>

                        <p className="font-medium text-neutral-900/60">1 of {stockCount}</p>
                    </div>
                </div>

                <OutlinedButton
                    type="button"
                    extraClasses="px-[18px] py-3 font-semibold bg-neutral-100 leading-[100%]"
                >
                    Place a bid
                </OutlinedButton>
            </div>
        </motion.div>
    );
}
