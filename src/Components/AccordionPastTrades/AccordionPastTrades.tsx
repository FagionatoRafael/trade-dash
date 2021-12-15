import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import TablePastTrades from '../../Components/tablePastTrades/tablePastTrades';

interface pastTradesParams {
    FromTo: string
      valueUSD: number,
    valueGBP:	number
  }

interface TablePsatTradeProps {
    rowsPast: Array<pastTradesParams>
}

const AccordionPastTrades: React.FC<TablePsatTradeProps> = (props) => {

  return (
  <>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
          <Typography>Past Trades</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
            <TablePastTrades rowsPast={props.rowsPast}/>
        </Typography>
      </AccordionDetails>   
    </Accordion>  
  </>
  );
}

export default AccordionPastTrades;