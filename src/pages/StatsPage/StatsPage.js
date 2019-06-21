import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Layout, Row, Col, Spin, Badge } from 'antd';
import AntDescription from '../../components/AntDescription';

const { Header, Content } = Layout;

const GET_ANTS = gql`
{
  ants {
    name
    length
    color
    weight
  }
}
`;

const getKey = (name)  => {
  let result = name.replace(/\s/g, '');
  result = result.replace(/[\u2018\u2019"'`]/g, '');
  return result;
};

const renderStatus = (calculations) => {
  if (!calculations || Object.keys(calculations).length === 0) return <Badge status="default" text="Not Yet Run" />;

  if (Object.keys(calculations).some(keyName => calculations[keyName].calculating === true)) {
    return <Badge status="processing" text="In Progress" />;
  }

  return <Badge status="success" text="Calculated" />;
}

const StatsPage = (props) => {
  return (
  <Layout>
    <Header>
      <div style={{ textAlign: 'center' }}>
        <span style={{
          color: 'white',
          fontSize: '32px',
          fontWeight: '300',
          fontFamily: "'Poppins', sans-serif"
        }}>
          Ant Stats Page
        </span>
      </div>
    </Header>
    <Row gutter={16}>
      <div style={{ margin: '10px 20px 0 0', textAlign: 'right' }}>
        <span>Overall status:</span>
        <div>
          {renderStatus(props.calculations)}
        </div>
      </div>
    </Row>
    <Content style={{ background: 'white', margin: '10px', padding: '10px' }}>
      <Query query={GET_ANTS}>
        {({ loading, error, data }) => {
          if (loading) return <Spin size="large" style={{ margin: 'auto' }} />;
          if (error) return `Error! ${error.message}`;

          let sortedAnts = [...data.ants];
          sortedAnts.sort(function(a,b) {
            const calcA = props.calculations[getKey(a.name)];
            const calcB = props.calculations[getKey(b.name)];
            if (calcA === undefined && calcA === undefined) return 0;
            if (calcA === undefined) return 1;
            if (calcB === undefined) return -1;
            return (calcB.value > calcA.value ? 1 : -1);
          });

          return (
                <Row gutter={16}>
                  {sortedAnts.map(ant => (
                    <Col span={24} key={getKey(ant.name)}>
                      <AntDescription
                        antId={getKey(ant.name)}
                        antData={ant}
                        initAction={props.initCalculation}
                        startAction={props.startCalculation}
                        endAction={props.endCalculation}
                        calculation={props.calculations[getKey(ant.name)]} />
                    </Col>
                  ))}
                </Row>
          );
        }}
      </Query>
    </Content>
  </Layout>
)};

export default StatsPage;