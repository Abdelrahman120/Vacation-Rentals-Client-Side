import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  cards = [
    {
      title: 'Card title 1',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      imageUrl: '../../../landing.jpeg',
      items: ['An item 1', 'A second item 1', 'A third item 1'],
      links: [
        { href: '#', text: 'Card link 1' },
        { href: '#', text: 'Another link 1' }
      ]
    },
    {
      title: 'Card title 2',
      text: 'Some more example text for the second card.',
      imageUrl: '../../../landing.jpeg',
      items: ['An item 2', 'A second item 2', 'A third item 2'],
      links: [
        { href: '#', text: 'Card link 2' },
        { href: '#', text: 'Another link 2' }
      ]
    },
    {
      title: 'Card title 1',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      imageUrl: '../../../landing.jpeg',
      items: ['An item 1', 'A second item 1', 'A third item 1'],
      links: [
        { href: '#', text: 'Card link 1' },
        { href: '#', text: 'Another link 1' }
      ]
    },
    {
      title: 'Card title 2',
      text: 'Some more example text for the second card.',
      imageUrl: '../../../landing.jpeg',
      items: ['An item 2', 'A second item 2', 'A third item 2'],
      links: [
        { href: '#', text: 'Card link 2' },
        { href: '#', text: 'Another link 2' }
      ]
    },
    // Add more cards as needed
  ];
}
