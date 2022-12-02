import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    icon: <AiIcons.AiFillHome />,
    path: '/',
    cName: 'nav-text',
  },
  {
    title: 'Create Survey',
    icon: <MdIcons.MdOutlineBorderColor />,
    path: '/CreateSurvey',
    cName: 'nav-text',
  },
  {
    title: 'Surveys',
    icon: <RiIcons.RiSurveyLine />,
    path: '/TakeSurvey',
    cName: 'nav-text',
  },
  {
    title: 'Results',
    icon: <FaIcons.FaChartBar />,
    path: '/Results',
    cName: 'nav-text',
  },
  {
    title: 'Register',
    icon: <FaIcons.FaChartBar />,
    path: '/Register',
    cName: 'nav-text',
  },
];
