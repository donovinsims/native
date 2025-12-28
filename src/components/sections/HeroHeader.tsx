"use client";

import React from 'react';
import { Button } from '../ui/button';

interface HeroHeaderProps {
  onSubscribeClick?: () => void;
}

const HeroHeader = ({ onSubscribeClick }: HeroHeaderProps) => {
  return (
    <section className="py-3 md:py-8">
      <h1 className="md:text-4xl md:leading-10 text-text tracking-[-2px] leading-none text-[39px] font-semibold">
        The best web design inspiration
      </h1>
      <h3 className="mt-2 text-base md:text-xl leading-6 md:leading-8 text-grey">
        Browse the best of the internet. Hand-picked and updated daily.
      </h3>
        <div className="mt-6 flex items-center gap-3">
            <Button
              onClick={onSubscribeClick}
              className="bg-text text-page border-none hover:bg-text/90 transition-colors h-11 px-6 rounded-xl"
            >
            Subscribe for free
          </Button>
          <span className="text-body text-grey">97 joined today</span>
        </div>
    </section>
  );
};

export default HeroHeader;
