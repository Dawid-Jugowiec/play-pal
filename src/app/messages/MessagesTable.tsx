'use client'

import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/table";
import { MessageDto } from '@/types';
import { Card } from '@heroui/card';
import { useMessages } from '@/hooks/useMessages';
import MessageTableCell from './MessageTableCell';


type Props = {
    initialMessages: MessageDto[],
};

export default function MessagesTable({initialMessages}:Props) {

    const { columns, deleteMessage, isDeleting, isOutbox, selectRow, messages} = useMessages(initialMessages);


    const rows = messages;
    return (
        <Card className='flex flex-col gap-3 h-[80vh] overflow-auto'>
            <Table 
                aria-label="Message"
                selectionMode='single'
                onRowAction={(key)=> selectRow(key)}
                shadow='none'
            >
                <TableHeader>
                {columns.map((column) =>
                    <TableColumn 
                        key={column.key}
                        width={column.key === 'text' ? '50%' : undefined}
                    >
                        {column.label}
                    </TableColumn>
                )}
                </TableHeader>
                <TableBody>
                {rows.map((row) =>
                    <TableRow key={row.id} className='cursor-pointer'>
                    {(columnKey) => 
                        <TableCell className={`${!row.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                            <div className={`${!row.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                                <MessageTableCell  
                                    item={row}
                                    columnKey={columnKey as string}
                                    isOutbox={isOutbox}
                                    deleteMessage={deleteMessage}
                                    isDeleting={isDeleting.loading && isDeleting.id === row.id}
                                />
                            </div>
                        </TableCell>}
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </Card>
  )
}
