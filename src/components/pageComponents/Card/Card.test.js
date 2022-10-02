import React from 'react';
import {/* screen, */ render, fireEvent} from '@testing-library/react';
import {Card} from './Card';

const titleImageRef = "testImageRef";
const titleValue = "testTitle";
const titleDescription = "testDescrition";

describe('Card', () => {
  it('is truthy', () => {
    expect(Card).toBeTruthy();
  });
});

test('Check if the value are corrects', () => {
  const {container} = render(
      <Card
        imageRef={titleImageRef}
        title={titleValue}
        description={titleDescription}
      />,
  );

  const imageRefElement = container.getElementsByTagName('img');
  expect(imageRefElement).not.toBeNull();
  const imageRefElementSrc = (imageRefElement[0].src).split("/");
  expect(imageRefElementSrc.at(-1)).toEqual(titleImageRef);

  const titleElement = container.getElementsByTagName('h3');
  expect(titleElement).not.toBeNull();
  const titleElementValue = titleElement[0].textContent;
  expect(titleElementValue).toEqual(titleValue);

  const descriptionElement = container.getElementsByTagName('p');
  expect(descriptionElement).not.toBeNull();
  const descriptionElementValue = descriptionElement[0].textContent;
  expect(descriptionElementValue).toEqual(titleDescription);

  expect(container.firstChild.classList.contains("card")).toBe(false);
  expect(container.firstChild.classList.contains("card--noHover")).toBe(true);

  // screen.debug();
});

test('Check image class name', () => {
  const {container} = render(
      <Card
        imageRef={titleImageRef}
        title={titleValue}
        description={titleDescription}
        func={()=>console.log(".")}
      />,
  );

  expect(container.firstChild.classList.contains("card")).toBe(true);
  expect(container.firstChild.classList.contains("card--noHover")).toBe(false);

  // screen.debug();
});

test('Check image click event', () => {
  const {container} = render(
      <Card
        imageRef={titleImageRef}
        title={titleValue}
        description={titleDescription}
        func={() => container.firstChild.classList.add("teste")}
      />,
  );

  const button = container.firstChild;
  fireEvent.click(button);

  expect(container.firstChild.classList.contains("teste")).toBe(true);

  // screen.debug();
});
