import Chance from 'chance'
import {Message} from '../index';
import React from 'react'
import {Button,} from 'react-bootstrap'

const user1 = 'Sam'
const user2 = 'Agent'

const chance = new Chance();
const makeSingleMsg = () => {
    const time = `${chance.date({ string: true })} ${chance.hour({ twentyfour: true })}:${chance.minute()}`
    return new Message(chance.android_id(), chance.pickone([chance.sentence(), chance.paragraph({sentences: 2 })]), chance.pickone([user1, user2]), time)
};
export const timeFormatter = (timeString) =>{
    try{
        const date = new Date(timeString)
        const time = date.toLocaleTimeString()
        const localeDate = date.toLocaleDateString()
        return `${localeDate} ${time}`
    }
    catch (e){
        return timeString
    }
}
export const addTextToMessageList = (text, messages =[]) =>{
    const newMsg = new Message(new Chance().android_id(), text, user2, new Date().toISOString())
    return [...messages, newMsg]
}
export const makeMessages = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(makeSingleMsg());
    }
    return arr;
}

const makeSingleMsgRecord =()=> ({
    id: chance.android_id(),
    timeStart: timeFormatter(chance.date().toISOString()),
    timeEnd: timeFormatter(chance.date().toISOString()),
    user: chance.last({ nationality: 'en' }),
    lastMessage:chance.pickone([chance.sentence(), chance.paragraph({sentences: 2 })]),
})
export const makeMessageData = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(makeSingleMsgRecord());
    }
    return arr;
}

export const msgTableHeaders = [
    {
        Header: 'Time Start',
        accessor: 'timeStart',
        width: 250,
    },
    {
        Header: 'Time End',
        accessor: 'timeEnd',
        width: 250,
    },
    {
        Header:'User',
        accessor:'user',
        width: 250,
    },
    {
        Header:'Last Message',
        accessor:'lastMessage'
    },
    {
        Header: 'Action',
        width: 250,
        id:'msg-rec-accessor',
        accessor: d =>{
            return(
                <div>
                    <Button size='sm' variant='success' className=' mr-2 rounded-0'>Open</Button>
                    <Button size='sm' variant='danger'  className=' mr-2 rounded-0'>Delete</Button>
                </div>
            )
        }
    }
]


