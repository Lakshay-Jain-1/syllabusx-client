import { ContentfulClientApi, createClient } from 'contentful';

var contentful: ContentfulClientApi<undefined>;

if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
    contentful = createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
} else {
    console.log(
        'Contentful Credentials not present! Switching to placeholder content.'
    );
}

export const getHomePageData = async () => {
    try {
        const content = await contentful.getEntries({
            content_type: 'homePage',
        });
        const items = content.items[0];
        const fields = items.fields;
        return fields;
    } catch (error) {
        return null;
    }
};

export const getChanges = async () => {
    try {
        const content = await contentful.getEntries({
            content_type: 'changeLogPage',
        });
        const items = content.items;
        const sortedItems = items.sort((a, b) => {
            return (
                // @ts-expect-error
                new Date(b.fields.releaseDate) - new Date(a.fields.releaseDate)
            );
        });
        return sortedItems;
    } catch (error) {
        return null;
    }
};

export const generateChangesPages = async () => {
    try {
        const content = await contentful.getEntries({
            content_type: 'changeLogPage',
        });
        const paths = content.items.map((item) => {
            return { id: item.sys.id };
        });
        return paths;
    } catch (error) {
        return null;
    }
};

export const getChange = async (version: string) => {
    try {
        const content = await contentful.getEntry(version);
        return content;
    } catch (error) {
        return null;
    }
};

export const getSyllabusxTeam = async () => {
    try {
        const content = await contentful.getEntries({
            content_type: 'syllabusxTeam',
        });
        const items = content.items;
        const sortedItems = items.sort((a, b) => {
            // @ts-expect-error
            return new Date(b.sys.createdAt) - new Date(b.sys.createdAt);
        });
        return sortedItems;
    } catch (error) {
        return null;
    }
};

export const getTAndC = async () => {
    try {
        const content = await contentful.getEntries({
            content_type: 'termsConditions',
        });
        const item = content.items[0];
        return item;
    } catch (error) {
        return null;
    }
};

export const getPolicy = async () => {
    try {
        const content = await contentful.getEntries({
            content_type: 'privacyPolicy',
        });
        const item = content.items[0];
        return item;
    } catch (error) {
        return null;
    }
};

export const getAboutUs = async () => {
    try {
        const content = await contentful.getEntries({
            content_type: 'aboutUs',
        });
        const item = content.items[0];
        return item.fields;
    } catch (error) {
        return null;
    }
};
