import Picture from "../../components/common/Picture";
import TextButton from "../../components/common/buttons/TextButton";

export default function ResourceNftCard({ item }) {
    const { img, avatar, title, price, nftNumber, totalNftNumber, timeLeft } = item || {};
    return (
        <div
            aria-label="nft card"
            className="p-3 bg-neutral-100 shadow-sm rounded-2xl hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative h-[223px]">
                <Picture
                    src={img}
                    alt="nft picture"
                    extraClasses="rounded-xl cursor-pointer"
                />

                <div className="absolute -bottom-4 left-3 flex items-center -space-x-3">
                    {avatar.map((avatarItem, index) =>
                        <div key={index}>
                            <Picture
                                src={avatarItem}
                                alt="nft buyer"
                                extraClasses=""
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="px-3.5 pt-6">
                <p className="text-neutral-900 text-600 font-bold leading-5 mb-[10px] cursor-pointer">{title}</p>

                <div className="flex items-center justify-between gap-4 mb-[18px]">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                            <g clipPath="url(#clip0_553_259)">
                                <path d="M9.24746 8.15574L4.80473 10.9395L0.35907 8.15574L4.80473 0.332336L9.24746 8.15574ZM4.80473 11.8335L0.35907 9.04968L4.80473 15.6912L9.25038 9.04968L4.80473 11.8335V11.8335Z" fill="#00AC4F" />
                            </g>
                            <defs>
                                <clipPath id="clip0_553_259">
                                    <rect width="9.35928" height="15.3588" fill="white" transform="translate(0.125 0.332336)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <p className="text-200 font-bold text-accent-400 leading-tight">{price} ETH</p>
                    </div>

                    <p className="font-medium leading-5 text-neutral-600/80">{nftNumber} of {totalNftNumber}</p>
                </div>

                <div className="pt-[11px] border-t border-solid border-neutral-300 flex flex-wrap items-center mobile-lg:max-[635px]:justify-center max-[305px]:justify-center justify-between gap-4">
                    <p className="text-200 text-primary bg-primary/5 font-medium leading-5 px-3 py-[4.5px] rounded-full">{timeLeft} left</p>

                    <TextButton
                        type="button"
                        extraClasses="text-500 text-primary font-medium leading-tight"
                    >
                        Place a bid
                    </TextButton>
                </div>
            </div>
        </div>
    );
}
