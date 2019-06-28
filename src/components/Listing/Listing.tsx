import React from 'react';

interface Props {
    listing: any;
}

const renderQuarter = (quarter: string, professors: Array<string>) => {
    return (
        <div className={`column quarterbox half`}>
            <div className="message-header">
                <p>{quarter}</p>
            </div>
            <div className={`message-body quartercontent`}>
                {professors.map((prof) => (<div className="professor-listing">{prof}</div>))}
            </div>
        </div>
    );
}

const Listing : React.FC<Props> = (props: Props) => {
    const { listing } = props;
    return (
        <div className={`listing-row columns`}>
            {
                (listing.Fall) ? renderQuarter("Fall", listing.Fall) : null
            }

            {
                (listing.Winter) ? renderQuarter("Winter", listing.Winter) : null
            }

            {
                (listing.Spring) ? renderQuarter("Winter", listing.Spring) : null
            }
        </div>
    );
}

export default Listing;