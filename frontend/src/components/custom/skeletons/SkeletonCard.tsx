import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const SkeletonCard = () => {
    return (
        <div>
            <Card className='bg-gray-200 animate-pulse'>
                <CardHeader>

                </CardHeader>
                <CardContent className='p-0'>
                    <ScrollArea className="h-[270px] px-6 py-2">

                    </ScrollArea>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </div>


    );
}

export default SkeletonCard;
