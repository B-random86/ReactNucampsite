import React, { Component } from "react";
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Directory from "./components/DirectoryComponent";
import Home from './components/HomeComponent';
import { CAMPSITES } from "./shared/campsites";
import { COMMENTS } from "./shared/comments";
import { PARTNERS } from "./shared/partners";
import { PROMOTIONS } from "./shared/promotions";
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './components/ContactComponent';
import CampsiteInfo from './components/CampsiteInfoComponent';
​
class Main extends Component {
​
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            promotions: PROMOTIONS,
            partners: PARTNERS,
            comments: COMMENTS
        };
    }
​
    render() {
​
        const HomePage = () => {
            return (
                <Home 
                campsite={this.state.campsites.filter(campsite => campsite.featured)}
                promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                partner={this.state.partners.filter(partner => partner.featured)[0]}
                />
            );
        }
​
        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                />
            );
        };    
        
​
        return (
            <div>
                <Header />
                <Switch>
                <Route path='/home' component={HomePage} />
                    <Route exact path='/directory:' render={() => <Directory campsites={this.state.campsites} />} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId}/>
                    <Route exact path='/contactus' component={Contact}/>
                    <Redirect path='/home'>
                    </Redirect>
                </Switch>
                <Footer/>
            </div>
        );
    }
​
}
export default Main;