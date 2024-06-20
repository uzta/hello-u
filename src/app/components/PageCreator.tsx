"use client";

import Image from "next/image";
import { CheckmarkIcon } from "./svgs/CheckmarkIcon";
import { XMarkIcon } from "./svgs/XMarkIcon";
import React from "react";
import type { ChangeEvent } from "react";
import Introduction from "./Introduction";
import { string } from "zod";
import { BackIcon } from "./svgs/BackIcon";

interface ContactData {
  name: string,
  value: string|undefined
}

interface ContactDataEntry {
  name: string;
  iconName: string;
  prefix?: string;
  value?: string;
  visible: boolean;
  valid?: boolean; // New field for validation status
  validated?: boolean; // New field to track if entry has been validated
}

export default function PageCreator() {
  const [stage, setStage] = React.useState<number>(0);
  const [name, setName] = React.useState<string|undefined>(undefined);

  const initialEntries: ContactDataEntry[] = [
    { name: "Phone", iconName: "/phone-icon.png", visible: false },
    { name: "Whatsapp", iconName: "/whatsapp-icon.png", visible: false },
    { name: "E-mail", iconName: "/mail-icon.png", visible: false },
    { name: "Instagram", iconName: "/instagram-icon.png", prefix: "https://www.instagram.com/", visible: false },
    { name: "LinkedIn", iconName: "/linkedin-icon.png", prefix: "https://www.linkedin.com/in/", visible: false },
    { name: "Website", iconName: "/website-icon.png", visible: false },
  ];

  const [entries, setEntries] = React.useState<ContactDataEntry[]>(initialEntries);
  const [buttonEnabled, setButtonEnabled] = React.useState<boolean>(false);
  const [shouldSubmit, setShouldSubmit] = React.useState<boolean>(false);

  React.useEffect(() => {
    const hasVisibleEntry = entries.some(entry => entry.visible);
    const allVisibleEntriesValid = entries.every(entry => !entry.visible || entry.valid);

    if (hasVisibleEntry && allVisibleEntriesValid) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [entries]);

  const phoneSchema = string().regex(/^\+?[0-9]{10,}$/);
  const emailSchema = string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  const websiteSchema = string().regex(/^https?:\/\/[^\s/$.?#].[^\s]*$/);

  const validationSchemas: Record<string, ReturnType<typeof string>> = {
    "Phone": phoneSchema,
    "Whatsapp": phoneSchema,
    "E-mail": emailSchema,
    "Website": websiteSchema
  };
  

  const onUpdateEntry = (updatedEntry: ContactDataEntry) => {
    const updatedEntries = entries.map((entry) =>
      entry.name === updatedEntry.name ? updatedEntry : entry
    );
    setEntries(updatedEntries);
  };

  const validateEntry = (entry: ContactDataEntry): boolean => {
    if (entry.visible && entry.value) {
      if (validationSchemas.hasOwnProperty(entry.name)) {
        const schema = validationSchemas[entry.name];
        if (schema) {
          try {
            schema.parse(entry.value);
            return true; // Validation passed
          } catch (error) {
            return false; // Validation failed
          }
        }
      } else {
        // If no specific validation schema, check for alphabetic characters and length
        if (/^[a-zA-Z]{3,}$/.test(entry.value)) {
          return true; // Valid alphabetic string of length 3 or more
        } else {
          return false; // Invalid
        }
      }
      return true; // Default case if entry.name is not found
    }
    return !entry.visible; // If not visible, it is considered valid
  };
  

  const validateEntries = () => {
    const updatedEntries = entries.map((entry) => ({
      ...entry,
      valid: validateEntry(entry),
      validated: entry.visible // Mark entry as validated if it is visible
    }));
    setEntries(updatedEntries);
    setShouldSubmit(true); // Set the flag to indicate validation is complete
  };

  React.useEffect(() => {
    if (shouldSubmit) {
      const contactData: ContactData[] = entries
        .filter(entry => entry.visible && entry.valid) // Filter by 'visible' property being true
        .map(entry => ({
          name: entry.name,
          value: entry.value, // Use prefix if available, otherwise use name as value
        }));

      const finalData: ContactData[] = [{ name: "Name", value: name }, ...contactData];

      console.log("FINAL DATA: ");
      console.log(finalData);
      setShouldSubmit(false); // Reset the flag after submission
    }
  }, [shouldSubmit, entries, name]);

  const DataEntryButton = ({ entry }: { entry: ContactDataEntry }) => {
    return entry.visible && (
      <button className="btn btn-outline btn-secondary w-full">{entry.name}</button>
    );
  };

  const DataEntry = ({ entry }: { entry: ContactDataEntry }) => {
    const [currentValue, setCurrentValue] = React.useState(entry.value ?? "");

    const updateVisibility = (e: ChangeEvent<HTMLInputElement>) => {
      setEntries((entries) =>
        entries.map((currentEntry) =>
          currentEntry.name === entry.name ? { ...currentEntry, visible: e.target.checked } : currentEntry
        )
      );
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(e.target.value);
    };

    const handleInputBlur = () => {
      onUpdateEntry({ ...entry, value: currentValue });
    };

    return (
      <div className="flex items-center gap-4 p-2">
        <div className="flex-shrink-0">
          <label>
            <input
              type="checkbox"
              className="checkbox"
              checked={entry.visible}
              onChange={updateVisibility}
            />
          </label>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <Image src={entry.iconName} width={500} height={500} alt={entry.name} />
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <label className="input input-bordered flex items-center w-full">
            {entry.prefix && <span>{entry.prefix}</span>}
            <input
              type="text"
              className="flex-grow"
              placeholder={!entry.prefix ? entry.name.toString() : ""}
              value={currentValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            {entry.visible && entry.validated && (
              entry.valid ? <CheckmarkIcon /> : <XMarkIcon />
            )}
          </label>
        </div>
      </div>
    );
  };

  const generateCode = () => {
    setStage(2)
  }  

  const ContactTable = () => {
    return (
      <div className="overflow-x-auto pt-8">
        <div className="flex flex-col w-full">
          {entries.map((entry: ContactDataEntry) => (
            <DataEntry key={entry.name} entry={entry} />
          ))}
          <div className="w-full">
            <button onClick={validateEntries} className="btn btn-primary mt-8 h-16 w-full">Validate</button>
            <button onClick={generateCode} className="btn btn-primary mt-4 h-16 w-full" disabled={!buttonEnabled}>Generate</button>
          </div>
        </div>
      </div>
    );
  };
  
  const previousStage = () => {
    if(stage === 0) {
      window.location.href = '/';
    }
    const previousStage = stage - 1
    setStage(previousStage)
  }

  const BackArrow = () => {
    return (
      <div className="absolute top-16 left-16 z-30 opacity-50 hover:opacity-100">
        <button onClick={previousStage}>
          <BackIcon/>
        </button>
      </div>
    )
  }

  return (
    stage === 0 ? (
      <>
        <Introduction setName={setName} setStage={setStage} />
        <BackArrow/>
      </>
    ) : (
      <>
        <BackArrow/>
        <div className="absolute top-24 h-5/6 w-2/3 z-20">
          <div className="mockup-phone w-1/3 h-full">
            <div className="camera"></div>
            <div className="display"></div>
          </div>
          <div className="absolute top-0 left-0 w-1/3 h-full p-8 pt-12">
            <div className="w-full h-full rounded-2xl rounded-t-none bg-white opacity-5" />
            <div className="w-full absolute top-12 left-0 py-16 px-12 flex flex-col items-start justify-center">
              <div className="avatar w-full flex items-center justify-center">
                <div className="w-24 rounded-full">
                  <Image src="/smiley.png" width={50} height={50} alt="Smiley" />
                </div>
              </div>
              <div className="w-full items-center justify-center text-2xl font-bold flex mt-4">
                <label>{name}</label>
              </div>
              <div className="w-full h-full flex mt-8 flex flex-col gap-4">
                {entries.map((entry) => (
                  <DataEntryButton key={entry.name} entry={entry} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-2/3 h-full absolute top-0 right-0 flex flex-col items-start justify-center p-12">
            <div className="w-full flex items-center justify-center">
              <Image src="/you-do-you.png" width={360} height={120} alt="You do you!" />
            </div>
            <div className="w-full h-full">
              {stage === 1 ? 
                <ContactTable />
              : stage === 2 &&
                <div className="w-full h-full mt-8 flex flex-col items-start items-center gap-4">
                  <div className="w-full h-8 flex items-center justify-center text-2xl">
                    <label>Here&apos;s your QR code!</label>
                  </div>
                  <Image src={"/qr-code.png"} height={500} width={500} alt="QR Code" className="border border-8 border-black rounded-2xl "/>
                  <div className="w-full h-8 flex items-center justify-center text-2xl">
                    <label className="text-xl italic opacity-25">The site will self-destroy after 10 minutes</label>
                  </div>                  
                </div>
              }
            </div>
          </div>
        </div>
      </>
    )
  );
}
