import React from 'react'

const CompressionCard = ({ date, time, text, compressed }) => {
    return (
        <div className='w-full rounded-xl bg-redCard flex flex-col p-3.5 pl-5 text-white mb-4'>
            <div className='py-1 flex flex-row'>
                <div className='w-1/2'>
                    <h3 className='text-sm font-bold'>{date}</h3>
                </div>
                <div className='w-1/2 text-right'>
                    <h3 className='text-sm font-bold'>{time}</h3>
                </div>
            </div>
            <div className='py-1 w-full'>
                <p className='font-bold text-base'>Plain Text</p>
                <p className='font-medium text-sm overflow-auto w-full'>{text}</p>
            </div>
            <div className='py-1 w-full'>
                <p className='font-bold text-base'>Compressed Text</p>
                <p className='font-medium text-sm overflow-auto w-full'>{compressed}</p>
            </div>
        </div>
    )
}

export default CompressionCard;