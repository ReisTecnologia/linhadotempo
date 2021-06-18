import React from 'react'

import { TimelineScroller } from './TimelineScroller'

export default {
  title: 'TimelineScroller',
  component: TimelineScroller,
}

const Template = (args) => <TimelineScroller {...args} />

export const Primary = Template.bind({})
Primary.args = {
  timelines: [
    {
      id: '1',
      name: 'Europa',
      time_entries: [
        {
          name: 'Inicio da Primeira Guerra Mundial',
          entry_year: 1914,
          entry_month: 7,
          entry_day: 28,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Evento no mesmo dia',
          entry_year: 1914,
          entry_month: 7,
          entry_day: 28,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Evento sem dia',
          entry_year: 1914,
          entry_month: 7,
          entry_day: null,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Evento sem dia 2',
          entry_year: 1914,
          entry_month: 6,
          entry_day: null,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Evento sem dia 3',
          entry_year: 1914,
          entry_month: 7,
          entry_day: null,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Evento sem mês',
          entry_year: 1914,
          entry_month: null,
          entry_day: null,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Término da Primeira Guerra Mundial',
          entry_year: 1918,
          entry_month: 11,
          entry_day: 11,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Inicio da Segunda Guerra Mundial',
          entry_year: 1939,
          entry_month: 9,
          entry_day: 1,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Término da Primeira Guerra Mundial',
          entry_year: 1945,
          entry_month: 9,
          entry_day: 2,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
        {
          name: 'Fundação da União Europeia',
          entry_year: 1993,
          entry_month: 11,
          entry_day: 1,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '1',
        },
      ],
    },
    {
      id: '2',
      name: 'Brasil',
      time_entries: [
        {
          name: 'Independência do Brasil',
          entry_year: 1822,
          entry_month: 9,
          entry_day: 7,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Abolição do trabalho escravo',
          entry_year: 1888,
          entry_month: 5,
          entry_day: 13,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Morte de Getúlio Vargas',
          entry_year: 1954,
          entry_month: 8,
          entry_day: 24,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Fundação de Brasília',
          entry_year: 1960,
          entry_month: 4,
          entry_day: 21,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Evento teste',
          entry_year: 1960,
          entry_month: 1,
          entry_day: 1,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Evento teste 2',
          entry_year: 1960,
          entry_month: 5,
          entry_day: 1,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Evento teste 3',
          entry_year: 1960,
          entry_month: 5,
          entry_day: 2,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Evento teste 4',
          entry_year: 1960,
          entry_month: 6,
          entry_day: 1,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
        {
          name: 'Evento teste 5',
          entry_year: 1960,
          entry_month: 6,
          entry_day: 1,
          annual_importance: true,
          monthly_importance: false,
          timeline_id: '2',
        },
      ],
    },
  ],
}
