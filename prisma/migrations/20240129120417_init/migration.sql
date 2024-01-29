-- CreateTable
CREATE TABLE `taddr01` (
    `addressId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `addrtype` CHAR(1) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `addrstatus` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `statusDate` DATETIME(3) NULL,
    `createDate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `creatorIp` VARCHAR(15) NOT NULL DEFAULT '0.0.0.0',
    `creatorInstCode` VARCHAR(14) NOT NULL DEFAULT '0000-0000',
    `creatorSecCode` VARCHAR(14) NOT NULL DEFAULT '0000-0000',
    `addruid` VARCHAR(73) NULL,
    `userid` INTEGER UNSIGNED NULL,
    `customerid` INTEGER UNSIGNED NULL,
    `lang` VARCHAR(2) NOT NULL,
    `creatorName` VARCHAR(50) NULL,

    UNIQUE INDEX `idx_address`(`address`),
    UNIQUE INDEX `idx_addruid`(`addruid`),
    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taddrstatus` (
    `addrstatus` INTEGER UNSIGNED NOT NULL,
    `statusDescInt` VARCHAR(45) NOT NULL,
    `statusDescExt` VARCHAR(45) NOT NULL,
    `statusType` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `addrStatusMsg` INTEGER UNSIGNED NULL,

    PRIMARY KEY (`addrstatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taddrtype` (
    `addrtype` CHAR(1) NOT NULL,
    `addrtypedesc` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`addrtype`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tcoach02` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` BINARY(16) NOT NULL DEFAULT 0x30,
    `coachGuid` VARCHAR(36) NULL,
    `name` VARCHAR(50) NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('Active', 'Suspended') NOT NULL DEFAULT 'Active',
    `updateDate` DATETIME(3) NULL,
    `numFollowers` INTEGER NULL DEFAULT 0,
    `addressId` INTEGER UNSIGNED NULL,
    `password` VARCHAR(100) NULL,
    `recoverPwdCode` VARCHAR(6) NULL,
    `recoverCodeValidity` DATETIME(3) NULL,

    UNIQUE INDEX `coachGuid_UNIQUE`(`coachGuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tcoachg04` (
    `coachId` INTEGER NOT NULL,
    `gameId` INTEGER NOT NULL,
    `gameGuid` VARCHAR(36) NULL,
    `fixed` BOOLEAN NULL DEFAULT true,
    `migratedCoachId` INTEGER NULL,

    INDEX `idx_tcoachgames_gameGuid`(`gameGuid`),
    PRIMARY KEY (`gameId`, `coachId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tcoachgpt03` (
    `coachId` INTEGER NOT NULL,
    `coachgameId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `teamName` VARCHAR(100) NULL,
    `points` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`coachId`, `coachgameId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tcoachp05` (
    `coachId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `teamName` VARCHAR(100) NULL,
    `points` INTEGER NOT NULL,

    INDEX `idx_coachpoints_timestamp`(`points` DESC, `timestamp`),
    PRIMARY KEY (`coachId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tcoachrk06` (
    `rankingPosition` INTEGER NOT NULL AUTO_INCREMENT,
    `coachGuid` VARCHAR(36) NOT NULL,
    `coachName` VARCHAR(50) NOT NULL,
    `teamName` VARCHAR(100) NULL,
    `points` INTEGER NOT NULL,
    `coachId` INTEGER NOT NULL,

    INDEX `coach_name_idx`(`coachName`),
    INDEX `fk_coach_id_idx`(`coachId`),
    INDEX `fk_coach_uuid_idx`(`coachGuid`),
    PRIMARY KEY (`rankingPosition`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tconfig` (
    `configKey` VARCHAR(20) NOT NULL,
    `valueInt` INTEGER NULL,
    `valueStr` VARCHAR(45) NULL,
    `lastUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`configKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tcountconv` (
    `cod3` VARCHAR(3) NOT NULL,
    `cod2` VARCHAR(2) NULL,

    PRIMARY KEY (`cod3`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tcountry` (
    `country` VARCHAR(2) NOT NULL,
    `countryDesc` VARCHAR(30) NULL,
    `groupId` INTEGER NULL DEFAULT 0,

    INDEX `groupId`(`groupId`),
    PRIMARY KEY (`country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tcountrydesc` (
    `lang` VARCHAR(2) NOT NULL,
    `country` VARCHAR(2) NOT NULL,
    `countryDesc` VARCHAR(30) NOT NULL,

    INDEX `idxCountry`(`country`),
    INDEX `idxLang`(`lang`),
    PRIMARY KEY (`lang`, `country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tfiletype` (
    `fileTypeId` INTEGER NOT NULL,
    `fileTypeDesc` VARCHAR(45) NOT NULL,
    `folder` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`fileTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tgver07` (
    `gameversion` CHAR(2) NOT NULL,
    `subversion` CHAR(1) NOT NULL DEFAULT 'S',
    `versioncode` VARCHAR(6) NULL,
    `versiondesc` VARCHAR(45) NOT NULL,
    `hasranking` BOOLEAN NOT NULL DEFAULT true,
    `yearlauched` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `ix_versioncode`(`versioncode`),
    PRIMARY KEY (`gameversion`, `subversion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tlangequivalence` (
    `baselang` VARCHAR(2) NOT NULL DEFAULT '',
    `equivlang` VARCHAR(2) NOT NULL DEFAULT '',

    PRIMARY KEY (`baselang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tlanguage` (
    `language` VARCHAR(2) NOT NULL,
    `langDesc` VARCHAR(50) NULL,
    `langEmission` VARCHAR(2) NULL,

    INDEX `TIdiomasTIdiomas`(`langEmission`),
    PRIMARY KEY (`language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tregion` (
    `country` VARCHAR(2) NOT NULL,
    `region` VARCHAR(3) NOT NULL,
    `regionCode` VARCHAR(3) NULL,
    `regionDesc` VARCHAR(255) NULL,
    `groupId` INTEGER NULL DEFAULT 0,
    `singleGeoIPRegion` BOOLEAN NULL,

    INDEX `Index_3`(`country`, `regionCode`),
    INDEX `groupId`(`groupId`),
    PRIMARY KEY (`country`, `region`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tsendtype` (
    `sendType` VARCHAR(3) NOT NULL,
    `sendTypeDesc` VARCHAR(30) NULL,

    PRIMARY KEY (`sendType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tz01` (
    `id` INTEGER NOT NULL DEFAULT 0,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userLocation` VARCHAR(10) NULL,
    `program` VARCHAR(20) NULL,
    `lang` VARCHAR(2) NULL,
    `installCode` VARCHAR(20) NULL,
    `securityCode` VARCHAR(20) NULL,
    `redirection` VARCHAR(100) NULL,
    `version` VARCHAR(20) NULL,
    `regname` VARCHAR(50) NULL,
    `ip` VARCHAR(20) NULL,
    `regLevel` INTEGER NULL,

    INDEX `Index_2`(`userLocation`),
    INDEX `Index_3`(`ip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tcoachp05` ADD CONSTRAINT `coadh_id` FOREIGN KEY (`coachId`) REFERENCES `tcoach02`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tcoachrk06` ADD CONSTRAINT `fk_coach_id` FOREIGN KEY (`coachId`) REFERENCES `tcoach02`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
