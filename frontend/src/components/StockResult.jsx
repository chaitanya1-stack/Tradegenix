import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingAnimation from './ LoadingAnimation.jsx'; // adjust path if needed

import api from '../api';
import './StockResult.css';

const StockResult = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await api.get(`/quote/${symbol}`);
        setStock(res.data);
      } catch (err) {
        alert('Stock not found or server error');
      }
    };

    const fetchOverview = async () => {
      try {
        const res = await api.get(`/overview/${symbol}`);
        setOverview(res.data);
      } catch (err) {
        console.error('Failed to fetch overview:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
    fetchOverview();
  }, [symbol]);
if (loading) return <LoadingAnimation />;


  return stock ? (
    <div className="completebox1">

      <div className="topheader"> 
          
            <div className="tradegenix2">TRADEGENIX <span className="dot2">.</span></div>
          

          <div className="discription">Clear Stock Visualizations For Smarter Trading Decisions.</div>
         

      </div>

      <div className="primarycard">
        <div className="primarycard1">
    {overview && (
  <div className="logo_name">
    <div className="logo_name_left">
      {overview.logo && <img src={overview.logo} alt="Company Logo" width="60" />}
      <div className="companyname">{overview.name}</div>
    </div>
    <div className="stock_symbol">{stock.symbol}</div>
  </div>
)}

   <div className="currentpricediv">
     <div className="currentprice">Current Price</div>
              <div className="currentprice_val">${stock.price}</div>

   </div>


         

        </div>
        <div className="primarycard2">
          <div className="primarycard2subdiv">
          <div className="marketcapdiv"><div className="marketcap">Market Cap:</div> <div className="marketcap_val">{overview.marketCap}</div></div>
           <div className="countrydiv"><div className="country">Country:</div> <div className='country_val'>{overview.country}.</div></div>
           </div>
           <div className="exchangediv"><div className="exchange">Exchange:</div> <div className="exchange_val">{overview.exchange}</div></div>
           <div className="exchangediv"><div className="exchange">Industry:</div> <div className="exchange_val">{overview.industry}</div></div>
            <div className="exchangediv"><div className="exchange">IPO Date:</div> <div className="exchange_val"> {overview.ipo}</div></div>
          
          
          
          
         
          
          
          </div>


      </div>


      <div className="secondarycard">
       < div className="secondarycard1">
           <div className="o-h-ldiv"> <div className="o-h-l">Open: </div><div className='o-h-l_value'>${stock.open}</div></div>
           <div className="o-h-ldiv"> <div className="o-h-l">high: </div><div className='o-h-l_value1'>${stock.high}</div></div>
           <div className="o-h-ldiv"> <div className="o-h-l">low: </div><div className='o-h-l_value2'>${stock.low}</div></div>
           <div className="o-h-ldiv"> <div className="o-h-l">Previous Close: </div><div className='o-h-l_value'>${stock.previousClose}</div></div>
            
        
        

      </div>

      < div className="secondarycard2">
      < div className="secondarycard21">
      <div className="extradatadiv"><div className="extradata">Change Percentage: </div> <div className="extradata_val">{stock.changePercent ?? 'N/A'}</div></div>
      <div className="extradatadiv"><div className="extradata">Latest Trading Day: </div> <div className="extradata_val">{stock.latestTradingDay ?? 'N/A'}</div></div>
      <div className="extradatadiv"><div className="extradata">Timestamp: </div> <div className="extradata_val">{new Date(stock.timestamp * 1000).toLocaleString()}</div></div>
      
      </div>
       
      < div className="secondarycard22">
      <a
       href="/historical" // or your desired route
       target="_blank"
       rel="noopener noreferrer"
       style={{ textDecoration: 'none', color: 'inherit' }}
>
      <div className="chartdiv">
      <i className="bi bi-graph-up-arrow"></i>
      <div className="chart">Click here To Get Historical Data.</div>
     </div>
     </a>

      <div className="otherlinksheaderdiv">
        <div className="otherlinksheader">Related Links You May Like.</div>
        <div className="otherlink1"> <i class="bi bi-bar-chart-steps"></i><div className="liks">Stock Market Basics And Trading Terminologies.</div> </div>
         <div className="otherlink1"><i class="bi bi-newspaper"></i> <div className="liks">company specific news.</div> </div>
          <div className="otherlink1"><i class="bi bi-exclamation-square-fill"></i> <div className="liks">How to Read Stock Data.</div></div>
           <div className="otherlink1"><i class="bi bi-display"></i> <a
                       href={overview.weburl}
                       target="_blank"
                       rel="noopener noreferrer"
                       style={{ textDecoration: 'none', color: '#366bbe' }} 
  >                     <div className="liks">Go To {overview.name} Website.</div>
                      
                      </a></div>
            
             </div>
      
      </div>
      </div>
      </div>
      

   
    

   


    

    </div>
  ) : (
    <p>Stock not found</p>
  );
};

export default StockResult;
