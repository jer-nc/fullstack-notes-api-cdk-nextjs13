import SkeletonCard from "./SkeletonCard";

 export const generateSkeletonCards = (count: number) => {
    const skeletonCards = [];

    for (let i = 0; i < count; i++) {
      skeletonCards.push(<SkeletonCard key={i} />);
    }

    return skeletonCards;
  };