'use client'

import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/table";
import { MessageDto } from '@/types';
import { Card } from '@heroui/card';
import { useMessages } from '@/hooks/useMessages';
import MessageTableCell from './MessageTableCell';
import { Button } from '@heroui/react';


type Props = {
    initialMessages: MessageDto[],
    nextCursor?: string,
};

export default function MessagesTable({initialMessages, nextCursor}:Props) {

    const { columns, deleteMessage, isDeleting, isOutbox, 
        selectRow, messages, loadMore, loadingMore, hasMore} = useMessages(initialMessages, nextCursor);


    const rows = messages;
    return (
        <div className='flex flex-col h-[80vh]'>
            <Card>
                <Table 
                    aria-label="Message"
                    selectionMode='single'
                    onRowAction={(key)=> selectRow(key)}
                    shadow='none'
                    className='flex flex-col gap-3 h-[80vh] overflow-auto'
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
                <div className='sticky bottom-0 pb-3 mr-3 text-right'>
                    <Button 
                        color='secondary'
                        isLoading={loadingMore}
                        isDisabled={!hasMore}
                        onPress={loadMore}
                    >
                        {hasMore ? "Load more" : "No more messages"}
                    </Button>
                </div>
            </Card>
        </div>
    )
}
