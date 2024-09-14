import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const NoDataCard = () => {
    return (
        <Card style={{ padding: '20px', textAlign: 'center', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
            <CardContent color="textSecondary">
                Looks like there&apos;s not enough data here.
            </CardContent>
        </Card>
    );
};

export default NoDataCard;
