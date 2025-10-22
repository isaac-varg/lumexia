
import React, { useState, useEffect } from 'react';
import { IPurchasingRequest } from '../../_functions/getRequests';
import Dropdown from '@/components/Dropdown';
import { updatePoItemDetails } from '../../_functions/updatePoItemDetails';
import { DatepickerRange } from '@/components/Dropdown/DateSelector';

const DateBadge = ({ request }: { request: IPurchasingRequest }) => {
  const [hasPO, setHasPO] = useState(true);

  const relevantPoItems = request.relevantPoItems

  const poItemDetails = relevantPoItems ? relevantPoItems[0]?.details[0] : null;


  useEffect(() => {
    if (!relevantPoItems || !poItemDetails) {
      setHasPO(false);
    }
  }, [relevantPoItems, poItemDetails]);

  let date: { start: Date | null; end: Date | null } = {
    start: null,
    end: null,
  };

  if (poItemDetails) {
    const { expectedDateStart, expectedDateEnd } = poItemDetails;
    date = { start: expectedDateStart, end: expectedDateEnd };
  }

  const handleDateSelection = async (value: DatepickerRange) => {

    if (relevantPoItems?.length !== 1) {
      // too many poitems
      return;
    }

    const update = await updatePoItemDetails(relevantPoItems[0].details[0].id, {
      expectedDateStart: value.start,
      expectedDateEnd: value.end,
    });

  };

  return (
    <div className='flex'>
      {!hasPO && (
        <div className="bg-neutral-300 px-2 py-1 rounded-xl font-poppins font-medium text-base">
          No Connected PO
        </div>
      )}

      {hasPO && (

        <div className="bg-neutral-300 px-2 py-1 rounded-xl font-poppins font-medium text-base">
          <Dropdown.Date onClick={handleDateSelection} value={date} />
        </div>
      )}
    </div>
  );
};

export default DateBadge;

