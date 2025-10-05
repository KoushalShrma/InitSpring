
import React, { useState } from 'react';

const ANNOTATION_DESCRIPTIONS: { [key: string]: { title: string, description: string } } = {
    '@Entity': {
        title: '@Entity',
        description: 'Specifies that the class is an entity. This annotation is applied to the entity class.'
    },
    '@Table': {
        title: '@Table',
        description: 'Specifies the primary table for the annotated entity.'
    },
    '@Id': {
        title: '@Id',
        description: 'Specifies the primary key of an entity.'
    },
    '@GeneratedValue': {
        title: '@GeneratedValue',
        description: 'Provides for the specification of generation strategies for the values of primary keys.'
    },
    '@Column': {
        title: '@Column',
        description: 'Specifies the mapped column for a persistent property or field.'
    },
    '@OneToMany': {
        title: '@OneToMany',
        description: 'Defines a many-valued association with one-to-many multiplicity.'
    },
    '@ManyToOne': {
        title: '@ManyToOne',
        description: 'Defines a single-valued association to another entity class that has many-to-one multiplicity.'
    },
    '@ManyToMany': {
        title: '@ManyToMany',
        description: 'Defines a many-valued association with many-to-many multiplicity.'
    },
    '@JoinColumn': {
        title: '@JoinColumn',
        description: 'Specifies a column for joining an entity association or element collection.'
    },
    '@Data': {
        title: 'Lombok @Data',
        description: 'A convenient shortcut annotation that bundles the features of @ToString, @EqualsAndHashCode, @Getter, @Setter and @RequiredArgsConstructor together.'
    },
    '@NoArgsConstructor': {
        title: 'Lombok @NoArgsConstructor',
        description: 'Generates a constructor with no parameters.'
    },
    '@AllArgsConstructor': {
        title: 'Lombok @AllArgsConstructor',
        description: 'Generates a constructor with one parameter for each field in your class.'
    },
     '@Repository': {
        title: '@Repository',
        description: 'Indicates that an annotated class is a "Repository", originally defined by Domain-Driven Design (DDD) as "a mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects".'
    },
};

interface TooltipProps {
    annotation: string;
    children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ annotation, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const info = ANNOTATION_DESCRIPTIONS[annotation];

    if (!info) {
        return <>{children}</>;
    }

    return (
        <span
            className="relative cursor-pointer"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-dark-card border border-dark-border rounded-lg shadow-xl text-left font-sans normal-case">
                    <p className="font-bold text-brand-neon font-mono text-base">{info.title}</p>
                    <p className="text-sm text-dark-text-secondary mt-1">{info.description}</p>
                </div>
            )}
        </span>
    );
};
