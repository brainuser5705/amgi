# amki
Chrome extension integrated with Anki spaced repetition app, specialized for Korean

## Description

암기 (Amgi) is a Chrome extension that integrates with the [Anki flashcard software](https://apps.ankiweb.net/). It uses an add-on called [Anki-Connect](https://git.sr.ht/~foosoft/anki-connect#note-actions) that exposes a localhost server whenever Anki is running.

When a user highlights a word that they wish to add to Anki, 암기 will:
- fetch the appropriate audio file and definition from Papago Naver *(Google Translate but for the Korean language)*
- create the new card using Anki-Connect

Altogether, the extension makes adding new vocabulary to Anki much easier and faster. Now I can focus on studying Korean!

## Usage and Technical Details

The user **must** have a local installation of Anki with the Anki-Connect add-on. It must also be launched and running in order to use the extension.

## Tech "Stack"
- Chrome Extension APIs (webRequest, storage, fetch)
- Anki-Connect add-on
- pure Javascript

---

## Backstory

I am currently learning Korean and make vocabulary flashcards with the [Anki flashcard software](https://apps.ankiweb.net/). The problem is that making new cards is a very tedious process (need to input word, find the definition, download audio file, etc.) So I thought, why don't I **automate** it?

## Future Features and Improvements

- **Customized card creation**: Anki is highly customizable and allows for multiple types of flashcards with their own custom fields. We can extend this customization to the extension. For instance, the user can set up what fields they want to automate populate.
- **More stable audio source**: Audio and definition is currently scraped from Papago Naver. It would be more robust to find an API or dictionary files to supply these values.
- **Integration with LLM for grammar/vocab exercises generation**: Words from Anki can be fetched and used in a prompt to pass to a LLM asking to generate grammar/vocab exercises.
- **Better approach than using setTimeOut**: Use asynchronous Promises!
