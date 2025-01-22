import Card from '@/components/Card'
import ActivityPanel from '@/components/Panels/Activity/ActivityPanel'
import SectionTitle from '@/components/Text/SectionTitle'
import React from 'react'

type ActivityPanelProps = {
    activity: any
}

const ActivityPanelCard = ({ activity }: ActivityPanelProps) => {
    return (
        <Card.Root>

            <Card.Title>Activity Log</Card.Title>
            <ActivityPanel activity={activity} />
        </Card.Root>
    )
}

export default ActivityPanelCard
