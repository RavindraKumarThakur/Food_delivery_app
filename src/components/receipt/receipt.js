/* eslint-disable arrow-body-style */
import {useState} from 'react';
import { Grid, Button, Divider, ListItem, List } from '@mui/material';
import RECEIPTS from '../../_mock/receipts';
import DotDivider from '../dot-divider';
import ReceiptRibbon from '../receipt-ribbon';


const Receipt = () =>{

    const receipt = RECEIPTS[0];

    return(
        <div style={{ 
            margin: "auto",
            background: "rgb(221,221,221)",
            width: "400px"
        }}>
            <p> {receipt.name}</p>
            <DotDivider amount={24}/>
            <List>
            {
                receipt && receipt.items.map((e,i) =>(<>
                        <ListItem key={i}>
                            {e.name}
                        </ListItem>
                        <Divider />
                        </>
                ))
            }
            </List>
            <DotDivider amount={24}/>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px'
            }}>
                <span style={{marginLeft: '16px'}}>Amount:</span>
                <span style={{marginRight: '16px'}}>{receipt.receiptAmount} RSD</span>
            </div>
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between',
                paddingBottom: '20px'}}
                >
                    <span style={{marginLeft: '16px'}}>Tax:</span>
                    <span style={{marginRight: '16px'}}>{receipt.receiptTax} RSD</span>
            </div>

            <ReceiptRibbon amount={8}/>

            
        </div>
    )
};

export default Receipt;