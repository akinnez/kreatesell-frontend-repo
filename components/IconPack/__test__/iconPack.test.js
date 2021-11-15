import renderer from "react-test-renderer";
import {
  Shop,
  OneTimeSubscriptionIcon,
  DeleteIcon,
  MembershipSubscriptionIcon,
  DigitalDownloadIcon,
  Dashboard,
  Product,
  Chart,
  Wallet,
  AddUser,
  Dollar,
  Ticket,
  Setting,
  Card,
  Logout,
  Diamond,
  PageDot,
  Bell,
  DropdownIndicator,
  Cog,
  ProfileInputIcon,
  CheckMark,
  ShareIcon,
  UploaderIcon,
  EditIcon,
  ViewAs,
  FilterIcon,
  Twitter,
  Facebook,
  Instagram,
  LinkedIn,
  Copy, 
  ProfileIcon,
  CloseSubMenu,

} from "../index";

const mockPrimaryColor = "mockColor";
const mockClassName = "mockClass";
const mockFunc = jest.fn();

describe("Shop :", () => {
  it("renders a snapshot of <Shop /> with mock values of primaryColor and className and the active Prop at true", () => {
    const shop = renderer
      .create(
        <Shop
          active={true}
          primaryColor={mockPrimaryColor}
          className={mockClassName}
        />
      )
      .toJSON();
    expect(shop).toMatchSnapshot();
  });
  it("renders a snapshot of <Shop /> with mock values of primaryColor and className and the active Prop at false", () => {
    const shop = renderer
      .create(
        <Shop
          active={false}
          primaryColor={mockPrimaryColor}
          className={mockClassName}
        />
      )
      .toJSON();
    expect(shop).toMatchSnapshot();
  });
});

describe("OneTimeSubscriptionIcon : ", () => {
  it("renders a snapshot of <OneTimeSubscription /> with active set to true and onHover at false", () => {
    const oneTimeSub = renderer
      .create(<OneTimeSubscriptionIcon active={true} onHover={false} />)
      .toJSON();
    expect(oneTimeSub).toMatchSnapshot();
  });
  it("renders a snapshot of <OneTimeSubscription /> with active set to false and onHover at true", () => {
    const oneTimeSub = renderer
      .create(<OneTimeSubscriptionIcon active={false} onHover={true} />)
      .toJSON();
    expect(oneTimeSub).toMatchSnapshot();
  });
  it("renders a snapshot of <OneTimeSubscription /> with both props set at false", () => {
    const oneTimeSub = renderer
      .create(<OneTimeSubscriptionIcon active={false} onHover={false} />)
      .toJSON();
    expect(oneTimeSub).toMatchSnapshot();
  });
  it("renders a snapshot of <OneTimeSubscription /> with both props set at true", () => {
    const oneTimeSub = renderer
      .create(<OneTimeSubscriptionIcon active={true} onHover={true} />)
      .toJSON();
    expect(oneTimeSub).toMatchSnapshot();
  });
});

describe("DeleteIcon: ", () => {
  it("renders a snapshot of <DeleteIcon /> with its default color prop value supplied", () => {
    const deleteIcon = renderer.create(<DeleteIcon />).toJSON();
    expect(deleteIcon).toMatchSnapshot();
  });
});

describe("MembershipSubscriptionIcon : ", () => {
  it("renders a snapshot of <MembershipSubscriptionIcon /> with no props / both being FALSE", () => {
    const memberShipSubIcon = renderer
      .create(<MembershipSubscriptionIcon />)
      .toJSON();
    expect(memberShipSubIcon).toMatchSnapshot();
  });
  it("renders a snapshot of <MembershipSubscriptionIcon /> with active prop at true and onHover at false", () => {
    const memberShipSubIcon = renderer
      .create(<MembershipSubscriptionIcon active={true} onHover={false} />)
      .toJSON();
    expect(memberShipSubIcon).toMatchSnapshot();
  });
  it("renders a snapshot of <MembershipSubscriptionIcon /> with active prop at false and onHover at true", () => {
    const memberShipSubIcon = renderer
      .create(<MembershipSubscriptionIcon active={false} onHover={true} />)
      .toJSON();
    expect(memberShipSubIcon).toMatchSnapshot();
  });
  it("renders a snapshot of <MembershipSubscriptionIcon /> with both props supplied  as true", () => {
    const memberShipSubIcon = renderer
      .create(<MembershipSubscriptionIcon active={true} onHover={true} />)
      .toJSON();
    expect(memberShipSubIcon).toMatchSnapshot();
  });
});

describe("DigitalDownloadIcon : ", () => {
  it("renders a snapshot of <DigitalDownloadIcon /> with no props / both being FALSE", () => {
    const digitalDownLoadIcon = renderer
      .create(<DigitalDownloadIcon />)
      .toJSON();
    expect(digitalDownLoadIcon).toMatchSnapshot();
  });
  it("renders a snapshot of <DigitalDownloadIcon /> with active prop at true and onHover at false", () => {
    const digitalDownLoadIcon = renderer
      .create(<DigitalDownloadIcon active={true} onHover={false} />)
      .toJSON();
    expect(digitalDownLoadIcon).toMatchSnapshot();
  });
  it("renders a snapshot of <DigitalDownloadIcon /> with active prop at false and onHover at true", () => {
    const digitalDownLoadIcon = renderer
      .create(<DigitalDownloadIcon active={false} onHover={true} />)
      .toJSON();
    expect(digitalDownLoadIcon).toMatchSnapshot();
  });
  it("renders a snapshot of <DigitalDownloadIcon /> with both props supplied  as true", () => {
    const digitalDownLoadIcon = renderer
      .create(<DigitalDownloadIcon active={true} onHover={true} />)
      .toJSON();
    expect(digitalDownLoadIcon).toMatchSnapshot();
  });
});

describe("Dashboard : ", () => {
  it("renders <Dashboard /> with no props passed and default Prop values being used", () => {
    const dashboard = renderer.create(<Dashboard />).toJSON();
    expect(dashboard).toMatchSnapshot();
  });
  it("renders <Dashboard /> with a mock className and the active prop at false", () => {
    const dashboard = renderer
      .create(<Dashboard className={mockClassName} active={false} />)
      .toJSON();
    expect(dashboard).toMatchSnapshot();
  });
  it("renders <Dashboard /> with a mock className and the active prop at true", () => {
    const dashboard = renderer
      .create(<Dashboard className={mockClassName} active={true} />)
      .toJSON();
    expect(dashboard).toMatchSnapshot();
  });
});

describe("Product : ", () => {
  it("renders <Product /> with no props passed and default Prop values being used", () => {
    const product = renderer.create(<Product />).toJSON();
    expect(product).toMatchSnapshot();
  });
  it("renders <Product /> with a mock className and the active prop at false", () => {
    const product = renderer
      .create(<Product className={mockClassName} active={false} />)
      .toJSON();
    expect(product).toMatchSnapshot();
  });
  it("renders <Product /> with a mock className and the active prop at true", () => {
    const product = renderer
      .create(<Product className={mockClassName} active={true} />)
      .toJSON();
    expect(product).toMatchSnapshot();
  });
});

describe("Chart : ", () => {
  it("renders a snapshot of <Chart /> with no props passed", () => {
    const chart = renderer.create(<Chart />).toJSON();
    expect(chart).toMatchSnapshot();
  });
  it("renders a snapshot of <Chart /> with active prop set at false", () => {
    const chart = renderer.create(<Chart active={false} />).toJSON();
    expect(chart).toMatchSnapshot();
  });
  it("renders a snapshot of <Chart /> with active prop set at true", () => {
    const chart = renderer.create(<Chart active={true} />).toJSON();
    expect(chart).toMatchSnapshot();
  });
});

describe("Wallet : ", () => {
  it("renders <Wallet /> with no props passed and default Prop values being used", () => {
    const wallet = renderer.create(<Wallet />).toJSON();
    expect(wallet).toMatchSnapshot();
  });
  it("renders <Wallet /> with a mock className and the active prop at false", () => {
    const wallet = renderer
      .create(<Wallet className={mockClassName} active={false} />)
      .toJSON();
    expect(wallet).toMatchSnapshot();
  });
  it("renders <Wallet /> with a mock className and the active prop at true", () => {
    const wallet = renderer
      .create(<Wallet className={mockClassName} active={true} />)
      .toJSON();
    expect(wallet).toMatchSnapshot();
  });
});

describe("AddUser : ", () => {
  it("renders a snapshot of <AddUser  /> with no props passed which is === when active prop is false", () => {
    const addUser = renderer.create(<AddUser />).toJSON();
    expect(addUser).toMatchSnapshot();
  });
  it("renders a snapshot of <AddUser  /> with active prop set at true", () => {
    const addUser = renderer.create(<AddUser active={true} />).toJSON();
    expect(addUser).toMatchSnapshot();
  });
});

describe("Dollar : ", () => {
  it("renders a snapshot of <Dollar  /> with no props passed which is === when active prop is false", () => {
    const dollarIcon = renderer.create(<Dollar />).toJSON();
    expect(dollarIcon).toMatchSnapshot();
  });
  it("renders a snapshot of <Dollar  /> with active prop set at true", () => {
    const dollarIcon = renderer.create(<Dollar active={true} />).toJSON();
    expect(dollarIcon).toMatchSnapshot();
  });
});

describe("Ticket : ", () => {
  it("renders <Ticket /> with no props passed and default Prop values being used", () => {
    const ticketIcon = renderer.create(<Ticket />).toJSON();
    expect(ticketIcon).toMatchSnapshot();
  });
  it("renders <Ticket /> with a mock className and the active prop at false", () => {
    const ticketIcon = renderer
      .create(<Ticket className={mockClassName} active={false} />)
      .toJSON();
    expect(ticketIcon).toMatchSnapshot();
  });
  it("renders <Ticket /> with a mock className and the active prop at true", () => {
    const ticketIcon = renderer
      .create(<Ticket className={mockClassName} active={true} />)
      .toJSON();
    expect(ticketIcon).toMatchSnapshot();
  });
});

describe("Setting : ", () => {
  it("renders <Setting /> with no props passed and default Prop values being used", () => {
    const settingsIcon = renderer.create(<Setting />).toJSON();
    expect(settingsIcon).toMatchSnapshot();
  });
  it("renders <Setting /> with a mock className and the active prop at false", () => {
    const settingsIcon = renderer
      .create(<Setting className={mockClassName} active={false} />)
      .toJSON();
    expect(settingsIcon).toMatchSnapshot();
  });
  it("renders <Setting /> with a mock className and the active prop at true", () => {
    const settingsIcon = renderer
      .create(<Setting className={mockClassName} active={true} />)
      .toJSON();
    expect(settingsIcon).toMatchSnapshot();
  });
});

describe("Card : ", () => {
  it("renders a snapshot of <Card /> with no props passed", () => {
    const card = renderer.create(<Card />).toJSON();
    expect(card).toMatchSnapshot();
  });
  it("renders a snapshot of <Card /> with primaryColor mocked and active prop set at false", () => {
    const card = renderer
      .create(<Card primaryColor={mockPrimaryColor} active={false} />)
      .toJSON();
    expect(card).toMatchSnapshot();
  });
  it("renders a snapshot of <Card /> with primaryColor mocked and active prop set at true", () => {
    const card = renderer
      .create(<Card primaryColor={mockPrimaryColor} active={true} />)
      .toJSON();
    expect(card).toMatchSnapshot();
  });
});

describe("Logout : ", () => {
  it("renders a snapshot of the Logout icon", () => {
    const logout = renderer.create(<Logout />).toJSON();
    expect(logout).toMatchSnapshot();
  });
});
describe("Diamond : ", () => {
  it("renders a snapshot of the Diamond icon", () => {
    const diamondIcon = renderer.create(<Diamond />).toJSON();
    expect(diamondIcon).toMatchSnapshot();
  });
});

describe("PageDot  : ", () => {
  it("renders a snapshot of the PageDot  icon", () => {
    const pageDotIcon = renderer.create(<PageDot />).toJSON();
    expect(pageDotIcon).toMatchSnapshot();
  });
});

describe("Bell  : ", () => {
  it("renders a snapshot of the Bell  icon", () => {
    const bellIcon = renderer.create(<Bell />).toJSON();
    expect(bellIcon).toMatchSnapshot();
  })
});

// describe("DropdownIndicator   : ", () => {
//   it("renders a snapshot of the DropdownIndicator   icon", () => {
//     const dropDownIndicatorIcon = renderer
//       .create(<DropdownIndicator getStyles={{}} />)
//       .toJSON();
//     expect(dropDownIndicatorIcon).toMatchSnapshot();
//   });
// });

describe("Cog : ", () => {
  it('renders a snapshot of <Cog />', () => {
    const cogIcon = renderer.create(<Cog />).toJSON()
    expect(cogIcon).toMatchSnapshot()
  })
})

describe("ProfileInputIcon : ", () => {
  it('renders a snapshot of <ProfileInputIcon />', () => {
    const profileInputIcon = renderer.create(<ProfileInputIcon />).toJSON()
    expect(profileInputIcon).toMatchSnapshot()
  })
})

describe("UploaderIcon : ", () => {
  it('renders a snapshot of <UploaderIcon />', () => {
    const uploaderIcon = renderer.create(<UploaderIcon />).toJSON()
    expect(uploaderIcon).toMatchSnapshot()
  })
})

describe("EditIcon : ", () => {
  it('renders a snapshot of <EditIcon />', () => {
    const editIcon = renderer.create(<EditIcon />).toJSON()
    expect(editIcon).toMatchSnapshot()
  })
})

describe("ShareIcon : ", () => {
  it('renders a snapshot of <ShareIcon />', () => {
    const shareIcon = renderer.create(<ShareIcon />).toJSON()
    expect(shareIcon).toMatchSnapshot()
  })
})

describe("CheckMark : ", () => {
  it('renders a snapshot of <CheckMark />', () => {
    const checkMarkIcon = renderer.create(<CheckMark />).toJSON()
    expect(checkMarkIcon).toMatchSnapshot()
  })
})

describe("ViewAs : ", () => {
  it('renders a snapshot of <ViewAs />', () => {
    const viewAsIcon = renderer.create(<ViewAs />).toJSON()
    expect(viewAsIcon).toMatchSnapshot()
  })
})

describe("FilterIcon : ", () => {
  it('renders a snapshot of <FilterIcon />', () => {
    const filterIcon = renderer.create(<FilterIcon />).toJSON()
    expect(filterIcon).toMatchSnapshot()
  })
})


describe("Twitter : ", () => {
  it('renders a snapshot of <Twitter /> icon', () => {
    const twitterIcon = renderer.create(<Twitter />).toJSON()
    expect(twitterIcon).toMatchSnapshot()
  })
})

describe("Facebook : ", () => {
  it('renders a snapshot of <Facebook /> icon', () => {
    const facebookIcon = renderer.create(<Facebook />).toJSON()
    expect(facebookIcon).toMatchSnapshot()
  })
})

describe("Instagram : ", () => {
  it('renders a snapshot of <Instagram /> icon', () => {
    const instagramIcon = renderer.create(<Instagram />).toJSON()
    expect(instagramIcon).toMatchSnapshot()
  })
})

describe("LinkedIn : ", () => {
  it('renders a snapshot of <LinkedIn /> icon', () => {
    const linkedInIcon = renderer.create(<LinkedIn />).toJSON()
    expect(linkedInIcon).toMatchSnapshot()
  })
})

describe("Copy : ", () => {
  it('renders a snapshot of <Copy /> icon', () => {
    const copyIcon = renderer.create(<Copy />).toJSON()
    expect(copyIcon).toMatchSnapshot()
  })
})

describe("ProfileIcon : ", () => {
  it('renders a snapshot of <ProfileIcon /> icon', () => {
    const profileIcon = renderer.create(<ProfileIcon />).toJSON()
    expect(profileIcon).toMatchSnapshot()
  })
})
describe("CloseSubMenu : ", () => {
  it('renders a snapshot of <CloseSubMenu /> icon', () => {
    const closeSubMenuIcon = renderer.create(<CloseSubMenu />).toJSON()
    expect(closeSubMenuIcon).toMatchSnapshot()
  })
})

