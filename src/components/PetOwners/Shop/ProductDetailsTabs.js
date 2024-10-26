"use client";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const ProductDetailsTabs = () => {
    return (
        <div className='mt-10'>
            <Tabs>
                <TabList>
                    <Tab>Descriptions</Tab>
                    <Tab>Ingredients</Tab>
                    <Tab>Instructions</Tab>
                    <Tab>Warnings</Tab>
                </TabList>

                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 3</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 4</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ProductDetailsTabs;