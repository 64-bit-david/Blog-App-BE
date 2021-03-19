import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Stories from './Stories';
import AddStory from './AddStory';
import UserProfile from './UserProfile';
import Story from './Story';
import Author from './Author';



const App = () => {


  return (
    <div>
      <BrowserRouter>
        <Header />
        <div>
          <Route path="/" exact component={Stories} />
          <Route path="/add-story" component={AddStory} />
          <Route path="/your-profile" component={UserProfile} />
          <Route path="/stories/:storyId" component={Story} />
          <Route path="/author/:authorId" component={Author} />

        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;