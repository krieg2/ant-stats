import React, { useEffect } from 'react';
import { Descriptions, Badge, Statistic, Icon } from 'antd';
import { ReactComponent as AntSvg } from '../../images/ant.svg';

const renderStatus = (calculation) => {
  if (!calculation || (!calculation.calculating && !calculation.value)) return <Badge status="default" text="Not Yet Run" />;

  if (calculation.calculating) return <Badge status="processing" text="In Progress" />;

  return <Badge status="success" text="Calculated" />;
}

const renderImage = (name, length, weight, color) => {
  const cssColor = color.toLowerCase();
  return(
    <div>
      <h3>{name}</h3>
        <Icon component={AntSvg} style={{ color: `${cssColor}`, fontSize: `${length*weight}px` }} />
    </div>
  );
};

const AntDescription = ({ antId, antData, initAction, startAction, endAction, calculation }) => {
  useEffect(() => {
      initAction(antId);
      
      setTimeout(function() {
        startAction(antId);
        beginCalculator();
      }, 1000);
      
  }, [initAction, startAction, antId]);

  const beginCalculator = () => {
    const calculator = generateAntWinLikelihoodCalculator();

    calculator(endCalculator);
  };

  const endCalculator = (value) => {
    endAction(antId, value);
  };

  function generateAntWinLikelihoodCalculator() {
    var delay = 7000 + Math.random() * 7000;
    var likelihoodOfAntWinning = Math.random();

    return function(callback) {
      setTimeout(function() {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  return (
  <div style={{ margin: '5px', padding: '5px', border: '1px solid lightgrey' }}>
    <Descriptions title={renderImage(antData.name, antData.length, antData.weight, antData.color)} column={3} size="small" bordered>
      <Descriptions.Item label="Length">{antData.length}</Descriptions.Item>
      <Descriptions.Item label="Weight">{antData.weight}</Descriptions.Item>
      <Descriptions.Item label="Color">{antData.color}</Descriptions.Item>
      <Descriptions.Item label="Odds (of winning)" span={3}>
        <Statistic
            title={renderStatus(calculation)}
            value={calculation && calculation.value}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
          />
      </Descriptions.Item>
    </Descriptions>
    </div>
    );
  };

  export default AntDescription;
  