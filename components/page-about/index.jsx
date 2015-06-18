import React, {PropTypes, Component} from 'react'
import {addons} from 'react/addons'
import Card from '../card/'
import CardRow from '../card-row/'
import setHead from 'react-document-head'
const {shouldComponentUpdate} = addons.PureRenderMixin
const namespace = 'pageAbout'

export default class PageAbout extends Component {
  // use the pure-render mixin without the mixin. This allows us to use es6
  // classes and avoid "magic" code. NOTE: if this component is used directly
  // by react-router, you should delete it, otherwise, the <Link> component will
  // not cause a re-render
  shouldComponentUpdate (...args) {
    return shouldComponentUpdate.apply(this, args)
  }

  makeThumbUrl (url, size=1000) {
    const transform = 'c_thumb,fl_clip.strip_profile,g_face:center,h_1000,q_60,w_1000,q_60'
    return url.replace('/upload/', `/upload/${transform},h_${size},w_${size}/`)
  }

  makeThumb (url, alt) {
    return <img className={`${namespace}-thumb`} src={this.makeThumbUrl(url, 500)} srcSet={`${this.makeThumbUrl(url, 500)} 1x, ${this.makeThumbUrl(url, 1000)} 2x`} alt={alt} />
  }

  render () {
    setHead({title: this.props.title})
    return (<div className={namespace}>
      <CardRow>
        <Card>
          <img src="https://res.cloudinary.com/dvxzdky9t/image/upload/fl_strip_profile,q_50,w_500/v1433822962/su_ajdq9g.jpg" srcSet="https://res.cloudinary.com/dvxzdky9t/image/upload/fl_strip_profile,q_50,w_500/v1433822962/su_ajdq9g.jpg 1x, https://res.cloudinary.com/dvxzdky9t/image/upload/fl_strip_profile,q_50,w_1000/v1433822962/su_ajdq9g.jpg 2x" alt="Syracuse University" />
          <h3>How We Met</h3>
          <p>Joey and Rachel met in January 2007 while working at <abbr title="the independent student newspaper"><a href="http://dailyorange.com/">The Daily Orange</a></abbr> at Syracuse University, but didn’t start dating until three years later. Joey moved back to California only a few months later—and things didn’t look good—but after two years of trans-continental flights and long weekends, they decided to move to San Francisco together. They found a gorgeous rent-controlled apartment in the Richmond neighborhood near Sea Cliff with a great sushi restaurant and have been living there ever since.</p>
        </Card>
        <Card>
          <img src="https://res.cloudinary.com/dvxzdky9t/image/upload/fl_strip_profile,q_50,w_500/v1433822960/angel-island_e92xfv.jpg" srcSet="https://res.cloudinary.com/dvxzdky9t/image/upload/fl_strip_profile,q_50,w_500/v1433822960/angel-island_e92xfv.jpg 1x, https://res.cloudinary.com/dvxzdky9t/image/upload/fl_strip_profile,q_50,w_1000/v1433822960/angel-island_e92xfv.jpg 2x" alt="View from Angel Island" />
          <h3>The Proposal</h3>
          <p>Rachel had actually started looking for mangagement rings when Joey proposed on May 11, 2014. He tested her first, making her climb to a campsite on the east side of Angel Island and then forcing her to sleep outdoors sans tent. The next day as the sun was rising over the Berkeley hills and the city glittered in the pink morning light, Joey “popped the question” and, of course, she said, “yes.”</p>
        </Card>
        <Card>
          <img src="https://res.cloudinary.com/dvxzdky9t/image/upload/fl_strip_profile,q_50,w_500/v1433822960/quivera_dqgifl.jpg" srcSet="https://res.cloudinary.com/dvxzdky9t/image/upload/fl_strip_profile,q_50,w_500/v1433822960/quivera_dqgifl.jpg 1x, https://res.cloudinary.com/dvxzdky9t/image/upload/fl_strip_profile,q_50,w_1000/v1433822960/quivera_dqgifl.jpg 2x" alt="Quivera Vineyards"/>
          <h3>The Wedding</h3>
          <p>Knowing that a majority of their friends and family would be flying in for the festivities, Joey and Rachel wanted to give their guests the quintessential wine country experience. To them, this means good wine, good food, and good company. To that end they chose Quivira Vineyards as their setting, a biodynamic farm in the heart of Dry Creek Valley where they could dine amongst the vines and dance beneath the stars. </p>
        </Card>
      </CardRow>
      <CardRow>
        <Card>
          <h2>Wedding Party</h2>
        </Card>
      </CardRow>
      <CardRow className={`${namespace}-thumbs`}>
        <Card>
          {this.makeThumb('https://res.cloudinary.com/dvxzdky9t/image/upload/v1433822957/stephanie_fnlbwg.jpg', 'Stephanie Rivetz')}
          <div>
            <h3>Maid of Honor: Stephanie Rivetz, Esq.</h3>
            <p>Stephanie and Rachel met their freshman year at Syracuse University (at an extra credit lecture for their COM107 class given by some crazy woman from the National Enquirer). They exchanged numbers and became fast friends. In Fall 2006 while Rachel was abroad in London, she asked Steph to be her Facebook wife. Steph said “yes” and they have been social media married ever since :) Today Steph is an Associate at <abbr title="Law firm that hosts it's site on .net. Yuk."><a href="https://www.orrick.com/Pages/default.aspx">Orrick, Herrington, & Sutcliffe, LLP</a></abbr> in New York City.</p>
          </div>
        </Card>
        <Card>
          {this.makeThumb('https://res.cloudinary.com/dvxzdky9t/image/upload/v1433822958/danielle_frjll2.jpg', 'Danielle Fus')}
          <div>
            <h3>Danielle Fus</h3>
            <p>Danielle is Rachel’s entirely overeducated older sister. An English teacher at <abbr title="looks like the whole school district is hosted on some strange JAVA stack and violates HTTPS protocol with insecure assets :("><a href="https://www.montgomeryschoolsmd.org/schools/whitmanhs/">Whitman High School</a></abbr> in Bethesda, MD, Danielle just completed a certificate in education administration and supervision. Although to an outside observer they couldn’t be more different, the sisters have bonded over a mutual love of musicals, grammar, and Talbots sweaters.</p>
          </div>
        </Card>
        <Card>
          {this.makeThumb('https://res.cloudinary.com/dvxzdky9t/image/upload/v1433822957/konina_oloqcj.jpg', 'Konina Biswas')}
          <div>
            <h3>Konina Biswas</h3>
            <p>Konina is one of Joey’s oldest friends having met in just fourth grade after Joey moved to Saratoga from LA. Upon moving to SF, she and Rachel became close as well, a relationship that was solidified when they all travelled to India together in Fall 2012.  Nina is a UX Designer at <abbr title="heard of them?"><a href="https://google.com">Google</a></abbr>.</p>
          </div>
        </Card>
      </CardRow>
      <CardRow className={`${namespace}-thumbs`}>
        <Card>
          {this.makeThumb('https://res.cloudinary.com/dvxzdky9t/image/upload/v1433822958/matt_s9rtv8.jpg', 'Matt Bellezza')}
          <div>
            <h3>Best Man: Matt Bellezza</h3>
            <p>Matt and Joey were randomly assigned to the same freshman dorm room. Turns out, they're nearly the same person. Matt and Joey roomed together throughout college, including a 6 month stint in London. Matt works for <abbr title="In Matt's defense, it was just NBC when he joined."><a href="http://corporate.comcast.com/our-company/businesses/nbcuniversal">Comcast</a></abbr> doing information security in New Jersey.</p>
          </div>
        </Card>
        <Card>
          {this.makeThumb('https://res.cloudinary.com/dvxzdky9t/image/upload/v1433822957/phill_ykn6aj.jpg', 'Phill Baker')}
          <div>
            <h3>Phill Baker</h3>
            <p>Phill is Joey's 6-inch-taller little brother. They're only a year apart in age, and have shared many life events. Phill lives and works in New York City writing Ruby code (which we try not to hold against him) for a server hosting company, <abbr title="This site is hosted here!"><a href="https://www.digitalocean.com/">Digital Ocean</a></abbr>.</p>
          </div>
        </Card>
      </CardRow>
    </div>)
  }
}

PageAbout.propTypes = {
  title: PropTypes.string
}

PageAbout.defaultProps = {
  title: 'About Rachel & Joey'
}
